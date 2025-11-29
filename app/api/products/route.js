import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

// GET /api/attractions
export async function GET() {
  const promisePool = mysqlPool.promise();
  const [rows] = await promisePool.query(`SELECT * FROM games;`);
  return NextResponse.json(rows);
}

// POST /api/attractions  -> Create
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, detail, coverimage } = body;
    
    const promisePool = mysqlPool.promise();
    const [result] = await promisePool.query(
      `INSERT INTO games ( name, detail, coverimage)
       VALUES (?, ?, ?)`,
       [name, detail, coverimage]
    )

    const [rows] = await promisePool.query(
      `SELECT * FROM games WHERE id = ?`,
      [result.insertId]
    )
    return NextResponse.json(rows[0], { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    )
  }
}
