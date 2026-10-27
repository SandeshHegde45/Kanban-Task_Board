import { useDispatch, useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import SegmentedControl from "../../../shared/components/SegmentedControl";
import { PRIORITIES, STATUSES } from "../../tasks/constants";
import { SORT_OPTIONS } from "../constants";
import { setSearch, setPriority, setStatus, setAssignee, setSort, resetFilters } from "../filterSlice";

const withAll = (list) => [{ value: "all", label: "All" }, ...list.map(({ value, label }) => ({ value, label }))];

export default function FilterBar() {
  const dispatch = useDispatch();
  const { search, priority, status, assignee, sort } = useSelector((s) => s.filters);
  const isFiltering = search || priority !== "all" || status !== "all" || assignee !== "all";

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
      <label className="relative block lg:w-72">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search tasks by title"
          aria-label="Search tasks by title"
          className="w-full rounded-full bg-surface py-2.5 pl-11 pr-10 text-sm outline-none ring-1 ring-ink/10 focus:ring-2 focus:ring-ink"
        />
        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => dispatch(setSearch(""))}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink/40 hover:text-ink"
          >
            <X size={16} />
          </button>
        )}
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink/50">Priority</span>
        <SegmentedControl label="Filter by priority" options={withAll(PRIORITIES)} value={priority} onChange={(v) => dispatch(setPriority(v))} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink/50">Status</span>
        <SegmentedControl label="Filter by status" options={withAll(STATUSES)} value={status} onChange={(v) => dispatch(setStatus(v))} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-ink/50">Tasks</span>
        <SegmentedControl
          label="Filter by assignee"
          options={[{ value: "all", label: "All" }, { value: "me", label: "Assigned to me" }]}
          value={assignee}
          onChange={(v) => dispatch(setAssignee(v))}
        />
      </div>

      {isFiltering && (
        <button type="button" onClick={() => dispatch(resetFilters())} className="text-sm font-semibold underline underline-offset-4">
          Clear filters
        </button>
      )}

      <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
        <span className="text-sm text-ink/50">Sort</span>
        <SegmentedControl label="Sort tasks" options={SORT_OPTIONS} value={sort} onChange={(v) => dispatch(setSort(v))} />
      </div>
    </div>
  );
}
