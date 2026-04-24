import React from "react";
import { useSelector } from "react-redux";
import weeklyProgressCss from "./weeklyProgress.module.css";

export default function WeeklyProgress() {
  const habits = useSelector((state) => state.habits.items) || [];

  const getWeekDates = () => {
    const days = [];
    const today = new Date();

    let day = today.getDay();
    day = day === 0 ? 6 : day - 1; // Понедельник = 0

    const monday = new Date(today);
    monday.setDate(today.getDate() - day);

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      days.push(d.toISOString().split("T")[0]);
    }

    return days;
  };

  const weekDates = getWeekDates();

  const displayData = weekDates.map((date) => {
    const habitsAvailableOnThatDay = habits.filter((h) => {
      if (!h.createdAt) return true; // На случай, если у старых записей нет даты
      const createdDate = h.createdAt.split("T")[0];
      return createdDate <= date;
    });

    // 2. Считаем выполненные только из тех, что существовали тогда
    const done = habitsAvailableOnThatDay.filter((h) =>
      h.completedDates?.includes(date)
    ).length;

    // 3. Считаем процент от актуального на тот момент количества
    const percent = habitsAvailableOnThatDay.length
      ? Math.round((done / habitsAvailableOnThatDay.length) * 100)
      : 0;

    return { date, percent };
  });

  const averagePercent = Math.round(
    displayData.reduce((acc, item) => acc + item.percent, 0) / 7
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className={weeklyProgressCss.progressBlock}>
      <h3>Weekly Progress</h3>

      <div className={weeklyProgressCss.progressCard}>
        <div className={weeklyProgressCss.progressHeader}>
          <span className={weeklyProgressCss.totalBadge}>
            {averagePercent}%
          </span>
        </div>

        <div className={weeklyProgressCss.chart}>
          {displayData.map((item) => {
            const isToday = item.date === today;

            return (
              <div key={item.date} className={weeklyProgressCss.chartColumn}>
                <div className={weeklyProgressCss.barWrapper}>
                  <div className={weeklyProgressCss.barBackground}></div>

                  <div
                    className={weeklyProgressCss.barFill}
                    style={{
                      height: `${item.percent}%`,
                      background: isToday
                        ? "var(--accent-success)"
                        : "#e2e8f0",
                    }}
                  >
                    {item.percent > 0 && (
                      <span className={weeklyProgressCss.barTooltip}>
                        {item.percent}%
                      </span>
                    )}
                  </div>
                </div>

                <span
                  className={weeklyProgressCss.dayName}
                  style={{
                    fontWeight: isToday ? "bold" : "normal",
                  }}
                >
                  {new Date(item.date).toLocaleDateString("ru-RU", {
                    weekday: "short",
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}