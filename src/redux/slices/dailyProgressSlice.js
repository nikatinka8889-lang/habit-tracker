import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const fetchDailyProgress = createAsyncThunk(
  "dailyProgress/fetch",
  async (uid) => {
    const q = query(
      collection(db, "dailyProgress"),
      where("userId", "==", uid)
    );

    const snap = await getDocs(q);

    const result = {};

    snap.forEach((doc) => {
      const data = doc.data();

      if (!data.date) return;

      result[data.date] = {
        date: data.date,
        percent: data.percent || 0,
        total: data.total || 0,
        completed: data.completed || 0,
      };
    });

    return result;
  }
);

const dailyProgressSlice = createSlice({
  name: "dailyProgress",
  initialState: {
    items: {}, // 👈 ВАЖНО (объект по датам)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDailyProgress.fulfilled, (state, action) => {
      state.items = action.payload || {};
    });
  },
});

export default dailyProgressSlice.reducer;