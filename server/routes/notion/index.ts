import express from "express";
import TokenHandler from "../../lib/misc/TokenHandler";
import NotionAPIWrapper from "../../lib/notion/NotionAPIWrapper";
import NotionConnectionHandler from "../../lib/notion/NotionConnectionHandler";
import DB from "../../lib/storage/db";

import RequireAuthentication from "../../middleware/RequireAuthentication";
import convertPage from "./convert/convertPage";
import getPage from "./getPage";
import getBlocks from "./getBlocks";
import getBlock from "./getBlock";
import getDatabase from "./getDatabase";
import { queryDatabase } from "./queryDatabase";

const router = express.Router();

const ConfigureNotionAPI = async (
  req: express.Request,
  res: express.Response
): Promise<NotionAPIWrapper> => {
  console.debug("Configuring Notion API for " + req.originalUrl);
  const token = await TokenHandler.GetNotionToken(res.locals.owner);
  return new NotionAPIWrapper(token!);
};

router.get("/connect", RequireAuthentication, async (req, res) => {
  console.debug(`/connect ${req.query}`);
  const code = req.query.code;
  if (code) {
    try {
      const n = NotionConnectionHandler.Default();
      const token = await n.getAccessData(code.toString());
      await TokenHandler.SaveNotionToken(res.locals.owner, token);
      return res.redirect("/search");
    } catch (err) {
      console.error(err);
      return res.redirect("/search");
    }
  } else {
    return res.redirect("/search");
  }
});

router.post("/pages", RequireAuthentication, async (req, res) => {
  const query = req.body.query.toString() || "";

  const api = await ConfigureNotionAPI(req, res);
  if (query.includes("https://www.notion.so/")) {
    const page = await getPage(api, query, res);
    if (page) {
      return page;
    }
    return page;
  } else {
    try {
      const s = await api.search(query);
      res.json(s);
    } catch (error) {
      res.status(500).send();
    }
  }
});

router.get("/get-notion-link", RequireAuthentication, async (_req, res) => {
  console.debug(`/get-notion-link`);
  const clientId = NotionAPIWrapper.GetClientID();

  if (!clientId) {
    console.debug("no clientid!");
    return res.status(400).send();
  }

  const notionData = await DB("notion_tokens")
    .where({ owner: res.locals.owner })
    .returning(["token", "workspace_name"])
    .first();

  const link = `https://api.notion.com/v1/oauth/authorize?owner=user&client_id=${clientId}&response_type=code`;
  if (notionData) {
    console.debug("Found notion token for user");
    return res.status(200).send({
      link,
      isConnected: !!notionData.token,
      workspace: notionData.workspace_name,
    });
  } else {
    console.debug("No Notion token for user");
    return res.status(200).send({
      link,
      isConnected: false,
      workspace: null,
    });
  }
});

router.get("/convert/:id", RequireAuthentication, async (req, res) => {
  const api = await ConfigureNotionAPI(req, res);
  return convertPage(api, req, res);
});

router.get("/page/:id", RequireAuthentication, async (req, res) => {
  const id = req.params.id;
  console.debug("Getting page" + id);
  if (!id) {
    console.debug("no id");
    return res.status(400).send();
  }
  const api = await ConfigureNotionAPI(req, res);
  const page = await api.getPage(id.replace(/\-/g, ""));
  res.json(page);
});

router.get("/blocks/:id", RequireAuthentication, async (req, res) => {
  console.debug("Getting block " + req.params.id);
  const api = await ConfigureNotionAPI(req, res);
  return getBlocks(api, req, res);
});

router.get("/block/:id", RequireAuthentication, async (req, res) => {
  console.debug("Getting block " + req.params.id);
  const api = await ConfigureNotionAPI(req, res);
  return getBlock(api, req, res);
});

router.get("/database/:id", RequireAuthentication, async (req, res) => {
  console.log("Getting database " + req.params.id);
  const api = await ConfigureNotionAPI(req, res);
  return getDatabase(api, req, res);
});

router.get("/database/query/:id", RequireAuthentication, async (req, res) => {
  console.debug("Query database " + req.params.id);
  const api = await ConfigureNotionAPI(req, res);
  return queryDatabase(api, req, res);
});

export default router;
