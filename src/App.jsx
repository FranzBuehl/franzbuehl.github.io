
import React, { useState } from "react";

const attackCards = [
  "attack01.png", "attack02.png", "attack03.png", "attack04.png", "attack05.png", "attack06.png",
  "attack07.png", "attack08.png", "attack09.png", "attack10.png", "attack11.png", "attack12.png"
];

const defenseCards = [
  "defense01.png", "defense02.png", "defense03.png", "defense04.png", "defense05.png", "defense06.png",
  "defense07.png", "defense08.png", "defense09.png", "defense10.png", "defense11.png", "defense12.png"
];

export default function App() {
  const [attackDeck, setAttackDeck] = useState([...attackCards]);
  const [defenseDeck, setDefenseDeck] = useState([...defenseCards]);
  const [team1, setTeam1] = useState({ attack: null, defense: null });
  const [team2, setTeam2] = useState({ attack: null, defense: null });
  const [diceRoll, setDiceRoll] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const drawCard = (type, team) => {
    const deck = type === "attack" ? [...attackDeck] : [...defenseDeck];
    if (deck.length === 0) return;
    const index = Math.floor(Math.random() * deck.length);
    const card = deck.splice(index, 1)[0];
    type === "attack" ? setAttackDeck(deck) : setDefenseDeck(deck);
    const setter = team === 1 ? setTeam1 : setTeam2;
    setter((prev) => ({ ...prev, [type]: card }));
    setActiveImage(card);
  };

  const rollDice = () => {
    setDiceRoll(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <div className="app">
      <h1>Bierpong Power-Ups</h1>
      <div className="teams">
        {[1, 2].map((team) => (
          <div className="team" key={team}>
            <h2>Team {team}</h2>
            <p>Angriff: {(team === 1 ? team1.attack : team2.attack) || "-"}</p>
            <p>Verteidigung: {(team === 1 ? team1.defense : team2.defense) || "-"}</p>
            <button onClick={() => drawCard("attack", team)} disabled={(team === 1 ? team1.attack : team2.attack) !== null}>
              Angriff ziehen
            </button>
            <button onClick={() => drawCard("defense", team)} disabled={(team === 1 ? team1.defense : team2.defense) !== null}>
              Verteidigung ziehen
            </button>
          </div>
        ))}
      </div>
      <div className="dice">
        <button onClick={rollDice}>Würfeln</button>
        {diceRoll && <p>Gewürfelt: {diceRoll}</p>}
        <button onClick={() => window.location.reload()}>Neustart</button>
      </div>

      {activeImage && (
        <div className="popup" onClick={() => setActiveImage(null)}>
          <img src={`/${activeImage}`} alt="Karte" />
        </div>
      )}
    </div>
  );
}
