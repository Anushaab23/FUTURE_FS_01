import { useState } from "react";
import { Habit } from "./types";
import { getXPForHabit, xpToNextLevel } from "./utils/gameLogic";

function App() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);

  const addHabit = (name: string) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      difficulty: "easy",
      streak: 0,
      completedToday: false,
    };
    setHabits([...habits, newHabit]);
  };

  const completeHabit = (id: string) => {
    setHabits(habits.map(h => {
      if (h.id === id && !h.completedToday) {
        const earned = getXPForHabit(h.difficulty);
        setXP(prev => prev + earned);
        return { ...h, completedToday: true, streak: h.streak + 1 };
      }
      return h;
    }));
  };

  const nextLevelXP = xpToNextLevel(level);

  if (xp >= nextLevelXP) {
    setLevel(level + 1);
    setXP(0);
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-6">
      <h1 className="text-xl mb-6">PIXEL QUEST TRACKER</h1>

      <div className="mb-4">
        <p>LEVEL {level}</p>
        <div className="bg-gray-800 h-4 mt-2">
          <div
            className="bg-green-500 h-4"
            style={{ width: `${(xp / nextLevelXP) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => addHabit("New Quest")}
        className="border border-green-400 px-4 py-2 mb-4"
      >
        + ADD QUEST
      </button>

      {habits.map(habit => (
        <div
          key={habit.id}
          className="border border-green-400 p-3 mb-3"
        >
          <p>{habit.name}</p>
          <p>Streak: {habit.streak}</p>
          <button
            onClick={() => completeHabit(habit.id)}
            className="mt-2 border border-green-400 px-2 py-1"
          >
            COMPLETE
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
