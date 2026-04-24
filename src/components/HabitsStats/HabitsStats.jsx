import React from "react";
import habitsStatsCss from "./HabitsStats.module.css";
import StatCard from "./StatCard/StatCard";
import { useSelector } from "react-redux";

export default function HabitsStats() {
  const habits = useSelector((state) => state.habits.items) || [];

  const today = new Date().toISOString().split("T")[0];

  const totalHabits = habits.length;

  function calculateStreak(dates) {
    if (!dates || dates.length === 0) return 0;

    let streak = 0;
    let current = new Date();

    while (true) {
      const dateStr = current.toISOString().split("T")[0];

      if (dates.includes(dateStr)) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        if (streak === 0) {
          current.setDate(current.getDate() - 1);
          const yesterdayStr = current.toISOString().split("T")[0];
          if (!dates.includes(yesterdayStr)) break;
        } else {
          break;
        }
      }
    }

    return streak;
  }

  const bestStreak =
    habits.length > 0
      ? Math.max(...habits.map((h) => calculateStreak(h.completedDates)))
      : 0;

  const habitsAvailableToday = habits.filter((h) => {
    if (!h.createdAt) return true;
    return h.createdAt.split("T")[0] <= today;
  });

  const completedToday = habitsAvailableToday.filter((h) =>
    h.completedDates?.includes(today),
  ).length;

  const successRate =
    habitsAvailableToday.length > 0
      ? Math.round((completedToday / habitsAvailableToday.length) * 100)
      : 0;

  return (
    <div className={habitsStatsCss.statsGrid}>
      <StatCard
        information={bestStreak}
        nameCard={"Best Streak"}
        text={"Days"}
      />
      <StatCard
        information={totalHabits}
        nameCard={"Total Habits"}
        text={"Habits"}
      />
      <StatCard
        information={successRate}
        nameCard={"Success Rate"}
        text={"%"}
      />
    </div>
  );
}
