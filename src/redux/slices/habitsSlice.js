import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";


export const fetchHabits = createAsyncThunk(
  "habits/fetchHabits",
  async (uid) => {
    const q = query(
      collection(db, "habits"),
      where("userId", "==", uid)
    );

    const snap = await getDocs(q);

    const habits = [];

    snap.forEach((d) => {
      habits.push({ id: d.id, ...d.data() });
    });

    return habits;
  }
);


export const addHabitFirebase = createAsyncThunk(
  "habits/addHabitFirebase",
  async ({ uid, title }) => {
    const newHabit = {
      userId: uid,
      title,
      completedDates: [],
      createdAt: new Date().toISOString(),
    };

    const ref = await addDoc(collection(db, "habits"), newHabit);

    return { id: ref.id, ...newHabit };
  }
);


export const toggleHabitFirebase = createAsyncThunk(
  "habits/toggleHabitFirebase",
  async ({ habitId, currentHabit }) => {
    const today = new Date().toISOString().split("T")[0];

    let completedDates = currentHabit.completedDates || [];

    if (completedDates.includes(today)) {
      completedDates = completedDates.filter((d) => d !== today);
    } else {
      completedDates = [...completedDates, today];
    }

    await updateDoc(doc(db, "habits", habitId), {
      completedDates,
    });

    return { id: habitId, completedDates };
  }
);


export const deleteHabitFirebase = createAsyncThunk(
  "habits/deleteHabitFirebase",
  async (habitId) => {
    await deleteDoc(doc(db, "habits", habitId));
    return habitId;
  }
);


export const syncDailyProgress = createAsyncThunk(
  "habits/syncDailyProgress",
  async ({ uid, habits }) => {
    const today = new Date().toISOString().split("T")[0];

    const total = habits.length;

    const completed = habits.filter((h) =>
      h.completedDates?.includes(today)
    ).length;

    const percent = total ? Math.round((completed / total) * 100) : 0;

    await updateDoc(doc(db, "dailyProgress", `${uid}_${today}`), {
      userId: uid,
      date: today,
      total,
      completed,
      percent,
    });
console.log("SYNC DAILY PROGRESS TRIGGERED");
    return { date: today, percent };
  }
  
);


const habitsSlice = createSlice({
  name: "habits",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })

      .addCase(addHabitFirebase.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(toggleHabitFirebase.fulfilled, (state, action) => {
        const i = state.items.findIndex(
          (h) => h.id === action.payload.id
        );

        if (i !== -1) {
          state.items[i].completedDates =
            action.payload.completedDates;
        }
      })

      .addCase(deleteHabitFirebase.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (h) => h.id !== action.payload
        );
      });
  },
});

export default habitsSlice.reducer;