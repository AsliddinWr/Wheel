export async function POST(req) {
  const { prizes } = await req.json();

  if (!prizes || prizes.length === 0) {
    return Response.json({ error: "Prizes not found" }, { status: 400 });
  }

  const totalChance = prizes.reduce((sum, item) => sum + Number(item.chance), 0);
  let random = Math.random() * totalChance;

  for (const prize of prizes) {
    random -= Number(prize.chance);
    if (random <= 0) {
      return Response.json({ prize });
    }
  }

  return Response.json({ prize: prizes[0] });
}
