import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/authSlice";

const initialState = { search: "", priority: "all", status: "all", assignee: "all", sort: "newest" };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, { payload }) => { state.search = payload; },
    setPriority: (state, { payload }) => { state.priority = payload; },
    setStatus: (state, { payload }) => { state.status = payload; },
    setAssignee: (state, { payload }) => { state.assignee = payload; },
    setSort: (state, { payload }) => { state.sort = payload; },
    // Clearing filters keeps the chosen sort order.
    resetFilters: (state) => ({ ...initialState, sort: state.sort }),
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, () => initialState);
  },
});

export const { setSearch, setPriority, setStatus, setAssignee, setSort, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
