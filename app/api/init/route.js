import pool from "@/lib/db";

export async function GET() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS prizes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      chance NUMERIC NOT NULL,
      color TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS spins (
      id SERIAL PRIMARY KEY,
      prize_id INTEGER,
      prize_name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  const count = await pool.query("SELECT COUNT(*) FROM prizes");

  if (Number(count.rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO prizes (name, chance, color) VALUES
      ('1000 so‘m', 35, '#7c3aed'),
      ('5000 so‘m', 25, '#db2777'),
      ('10 000 so‘m', 15, '#0891b2'),
      ('Premium Gift', 10, '#f59e0b'),
      ('Jackpot', 5, '#22c55e'),
      ('Bo‘sh', 10, '#64748b')
    `);
  }

  return Response.json({ ok: true });
}
