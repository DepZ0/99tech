import { Request, RequestHandler, Response, Router } from "express";
import { openDb } from "../database";
import { Resource } from "../models/resource";

export const createResource: RequestHandler = async (req, res) => {
  const db = await openDb();
  const { name, description } = req.body;
  const result = await db.run("INSERT INTO resources (name, description) VALUES (?, ?)", [name, description]);
  res.json({ id: result.lastID, name, description });
};

export const listResources: RequestHandler = async (req, res) => {
  const db = await openDb();
  const resources = await db.all<Resource[]>("SELECT * FROM resources");
  res.json(resources);
};

export const getResource: RequestHandler = async (req, res) => {
  const db = await openDb();
  const resource = await db.get<Resource>("SELECT * FROM resources WHERE id = ?", [req.params.id]);
  res.json(resource);
};

export const updateResource: RequestHandler = async (req, res) => {
  const db = await openDb();
  const { name, description } = req.body;
  await db.run("UPDATE resources SET name = ?, description = ? WHERE id = ?", [name, description, req.params.id]);
  res.json({ id: req.params.id, name, description });
};

export const deleteResource: RequestHandler = async (req, res) => {
  const db = await openDb();
  await db.run("DELETE FROM resources WHERE id = ?", [req.params.id]);
  res.sendStatus(204);
};
