// ==============================================
// SearchFilter Component - Search Bar & Filters
// ==============================================
// A toolbar that lets users search tasks by title
// and filter by priority. Sits above the Kanban
// columns and filters tasks in real-time.
//
// Props:
//   - searchQuery      : string → current search text
//   - onSearchChange   : function(value) → updates search
//   - priorityFilter   : string → current priority filter
//   - onPriorityChange : function(value) → updates filter
//   - totalCount       : number → total task count
// ==============================================

const SearchFilter = ({
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  totalCount,
}) => {
  return (
    <div className="search-filter-bar">
      {/* ---- Search Input ---- */}
      <div className="relative flex-1 min-w-0">
        {/* Search icon */}
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
        />
        {/* Clear button — only shown when there's text */}
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full text-slate-500 hover:text-white hover:bg-slate-600 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ---- Priority Filter Dropdown ---- */}
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer min-w-[140px]"
      >
        <option value="all">All Priorities</option>
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>

      {/* ---- Total Count Badge ---- */}
      <div className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 bg-slate-800/30 rounded-xl border border-slate-700/50">
        <span className="text-xs text-slate-500">Total</span>
        <span className="text-sm font-semibold text-white">{totalCount}</span>
      </div>
    </div>
  );
};

export default SearchFilter;
