import { asyncHandler } from "../handlers.js";
import {
  getUsers,
  addUser
} from "./services.js";

export const getAll = asyncHandler(async function (req, res) {
  const docs = await getUsers();
  res.json(docs);
});

export const add = asyncHandler(async function (req, res) {
  const created = await addUser(req.body);
  res.status(201).json(created);
});