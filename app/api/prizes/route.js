import pool from "@/lib/db";

export async function GET() {
  const result = await pool.query("SELECT * FROM prizes ORDER BY id ASC");
  return Response.json(result.rows);
}

export async function POST(req) {
  const { password, name, chance, color } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Admin parol xato" }, { status: 403 });
  }

  await pool.query(
    "INSERT INTO prizes (name, chance, color) VALUES ($1, $2, $3)",
    [name, chance, color]
  );

  return Response.json({ ok: true });
}

export async function DELETE(req) {
  const { password, id } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Admin parol xato" }, { status: 403 });
  }

  await pool.query("DELETE FROM prizes WHERE id=$1", [id]);

  return Response.json({ ok: true });
}
