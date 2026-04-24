import React, { useEffect, useState } from "react";
import habitsCss from "./habits.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchHabits,
  toggleHabitFirebase,
  deleteHabitFirebase,
} from "../../redux/slices/habitsSlice";
import { toast } from "react-toastify";

export default function Habits({ children }) {
  const [deletingIds, setDeletingIds] = useState([]);
  const habits = useSelector((state) => state.habits.items);
  const uid = useSelector((state) => state.auth.uid);
  const status = useSelector((state) => state.habits.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) dispatch(fetchHabits(uid));
  }, [uid, dispatch]);

  const today = new Date().toISOString().split("T")[0];

  const handleHabitsDelete = async (habit) => {
    if (deletingIds.includes(habit.id)) return;

    setDeletingIds((prev) => [...prev, habit.id]);

    try {
      await dispatch(deleteHabitFirebase(habit.id)).unwrap();
      toast.success(`Habit ${habit.title} successfully removed`);
    } catch (e) {
      if (e.code !== "permission-denied") {
        toast.error(e.message);
      }
    } finally {
      setDeletingIds((prev) => prev.filter((id) => id !== habit.id));
    }
  };

  if (status === "loading") return <p>Загрузка привычек...</p>;
  if (!habits.length) return <p>У вас пока нет задач. Добавьте первую!</p>;

  return (
    <div className={habitsCss.habitsBlock}>
      <h3>{children}</h3>

      <section className={habitsCss.sectonHabits}>
        {habits.map((habit) => {
          const isDone = habit.completedDates?.includes(today);
          const streak = calculateStreak(habit.completedDates || []);

          return (
            <div
              key={habit.id}
              className={`${habitsCss.habitCard} ${
                isDone ? habitsCss.done : ""
              }`}
            >
              <div
                className={habitsCss.checkbox}
                onClick={() => {
                  dispatch(
                    toggleHabitFirebase({
                      habitId: habit.id,
                      currentHabit: habit,
                    }),
                  );
                }}
              >
                {isDone && <span className={habitsCss.checkMark}>✓</span>}
              </div>

              <div className={habitsCss.habitInfo}>
                <p className={habitsCss.habitTitle}>{habit.title}</p>

                <div className={habitsCss.streakInfo}>
                  <span className={habitsCss.streak}>
                    {streak > 0
                      ? `${streak} ${getDaysWord(streak)}`
                      : "Start today"}
                  </span>
                </div>
              </div>

              <button
                className={habitsCss.deleteBtn}
                onClick={() => handleHabitsDelete(habit)}
                disabled={deletingIds.includes(habit.id)}
              >
                <img
                  src="/src/assets/Images/backet.png"
                  alt="delete"
                  width="18"
                />
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;

  const sorted = [...dates].sort();

  let streak = 1;

  for (let i = sorted.length - 1; i > 0; i--) {
    const current = new Date(sorted[i]);
    const prev = new Date(sorted[i - 1]);

    const diff = (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function getDaysWord(number) {
  const lastDigit = number % 10;

  if (number > 10 && number < 20) return "days";
  if (lastDigit === 1) return "day";
  if (lastDigit >= 2 && lastDigit <= 4) return "days";
  return "days";
}
