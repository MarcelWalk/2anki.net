import { Request, Response } from "express";

import StorageHandler from "../../lib/storage/StorageHandler";
import DB from "../../lib/storage/db";

export default async function deleteUpload(req: Request, res: Response) {
  const key = req.params.key;
  console.log("delete", key);
  if (!key) {
    return res.status(400).send();
  }
  try {
    await DB("uploads").del().where({ owner: res.locals.owner, key });
    const s = new StorageHandler();
    await s.deleteWith(key);
    console.log("done deleting", key);
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
  return res.status(200).send();
}
