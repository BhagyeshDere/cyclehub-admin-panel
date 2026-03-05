import { Request, Response } from "express";
import pool from "../config/db";

export const getProducts = async (req: Request, res: Response) => {

  try {

    const result = await pool.query("SELECT * FROM products ORDER BY created_at DESC");

    res.json(result.rows);

  } catch (error) {

    res.status(500).json({ message: "Error fetching products" });

  }

};