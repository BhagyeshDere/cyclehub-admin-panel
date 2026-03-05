import { Request, Response } from "express";
import { pool } from "../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM admins WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const admin = result.rows[0];

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin.id, role: admin.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.json({ token });
};