import express from "express";

import NotionAPIWrapper from "../../../lib/notion/NotionAPIWrapper";
import performConversion from "./helpers/performConversion";

export default async function convertPage(
  api: NotionAPIWrapper,
  req: express.Request,
  res: express.Response
) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send();
  }
  return performConversion(api, id, res.locals.owner, req, res);
}
