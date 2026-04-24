import React from "react";
import analyticsCss from "./Analytics.module.css";
import Header from "../../components/Header/Header";
import HabitsStats from "../../components/HabitsStats/HabitsStats";
import WeeklyProgress from "../../components/WeeklyProgress/WeeklyProgress";
import Habits from "../../components/Habit/Habits";

export default function Analytics() {
  return (
    <div className={analyticsCss.analytics}>
      <Header children={"Analytics Report"} />
      <div className={analyticsCss.analyticsGrid}>
        <div className={analyticsCss.statsCards}>
          <HabitsStats />
        </div>

        <div className={analyticsCss.progressBlock}>
          <WeeklyProgress />
        </div>

        <div className={analyticsCss.habitsBlock}>
          <Habits Children={"Habit Breakdown"} />
        </div>
      </div>
    </div>
  );
}
