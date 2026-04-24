import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Добавили useSelector
import { addHabitFirebase } from "../../../redux/slices/habitsSlice";
import addHabitFormcss from "./addHabitForm.module.css";
import { toast } from "react-toastify";

export default function AddHabitForm() {
  const [habitTitleText, setHabitTitleText] = useState("");

  const uid = useSelector((state) => state.auth?.uid);

  const dispatch = useDispatch();

  const handleAddHabit = (e) => {
    e.preventDefault();

    if (!habitTitleText.trim() || !uid) {
      console.error(
        "Unable to add: no text or user not authorized",
      );
      toast.error("no task text");
      return;
    }

    dispatch(
      addHabitFirebase({
        uid: uid,
        title: habitTitleText,
      }),
    );
    toast.success(`Habit ${habitTitleText} added`);
    setHabitTitleText("");
  };

  return (
    <form className={addHabitFormcss.addHabit} onSubmit={handleAddHabit}>
  <div className={addHabitFormcss.inputWrapper}>
    <input
      type="text"
      placeholder="add new habit..."
      value={habitTitleText}
      onChange={(e) => setHabitTitleText(e.target.value)}
    />
    <button type="submit">add</button>
  </div>
</form>
  );
}
