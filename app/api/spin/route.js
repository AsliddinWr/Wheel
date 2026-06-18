import pool from "@/lib/db";

export async function POST() {
  const result = await pool.query("SELECT * FROM prizes ORDER BY id ASC");
  const prizes = result.rows;

  if (!prizes.length) {
    return Response.json({ error: "Sovrin yo‘q" }, { status: 400 });
  }

  const total = prizes.reduce((sum, p) => sum + Number(p.chance), 0);

  let rand = Math.random() * total;
  let winner = prizes[0];

  for (const prize of prizes) {
    rand -= Number(prize.chance);
    if (rand <= 0) {
      winner = prize;
      break;
    }
  }

  await pool.query(
    "INSERT INTO spins (prize_id, prize_name) VALUES ($1, $2)",
    [winner.id, winner.name]
  );

  return Response.json({ prize: winner });
}
