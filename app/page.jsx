"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [prizes, setPrizes] = useState([
    { name: "1000 so'm", chance: 40 },
    { name: "5000 so'm", chance: 25 },
    { name: "10 000 so'm", chance: 15 },
    { name: "Premium Gift", chance: 10 },
    { name: "Jackpot", chance: 5 },
    { name: "Bo'sh", chance: 5 }
  ]);

  const [name, setName] = useState("");
  const [chance, setChance] = useState("");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("wheel_prizes");
    if (saved) setPrizes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("wheel_prizes", JSON.stringify(prizes));
  }, [prizes]);

  const addPrize = () => {
    if (!name || !chance) return alert("Nom va foiz kiriting");

    setPrizes([
      ...prizes,
      {
        name,
        chance: Number(chance)
      }
    ]);

    setName("");
    setChance("");
  };

  const deletePrize = (index) => {
    setPrizes(prizes.filter((_, i) => i !== index));
  };

  const spin = async () => {
    if (spinning) return;

    setSpinning(true);
    setResult("");

    const res = await fetch("/api/spin", {
      method: "POST",
      body: JSON.stringify({ prizes })
    });

    const data = await res.json();

    const extraRotation = 3600 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + extraRotation);

    setTimeout(() => {
      setResult(data.prize.name);
      setSpinning(false);
    }, 4000);
  };

  return (
    <main className="container">
      <section className="hero">
        <h1>🎡 Premium Wheel</h1>
        <p>Spin qiling va yutuqni qo‘lga kiriting</p>
      </section>

      <section className="wheelBox">
        <div className="pointer">▼</div>

        <div
          className="wheel"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {prizes.map((item, index) => (
            <div
              key={index}
              className="slice"
              style={{
                transform: `rotate(${(360 / prizes.length) * index}deg)`
              }}
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <button onClick={spin} disabled={spinning} className="spinBtn">
          {spinning ? "Aylanmoqda..." : "SPIN"}
        </button>

        {result && (
          <div className="result">
            🎉 Siz yutdingiz: <b>{result}</b>
          </div>
        )}
      </section>

      <section className="admin">
        <h2>⚙️ Admin panel</h2>

        <div className="form">
          <input
            placeholder="Sovrin nomi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Foiz"
            value={chance}
            onChange={(e) => setChance(e.target.value)}
          />

          <button onClick={addPrize}>Qo‘shish</button>
        </div>

        <div className="list">
          {prizes.map((item, index) => (
            <div className="item" key={index}>
              <span>
                {item.name} — {item.chance}%
              </span>
              <button onClick={() => deletePrize(index)}>O‘chirish</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
