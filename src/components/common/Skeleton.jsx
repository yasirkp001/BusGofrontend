export const Skeleton = ({ className = '' }) => <div className={`skeleton ${className}`} />;

export const TableSkeleton = ({ rows = 6, cols = 5 }) => (
  <div className="card overflow-hidden">
    <div className="flex gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3.5">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-3 flex-1" />
      ))}
    </div>
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-5 py-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className={`h-4 flex-1 ${c === 0 ? 'max-w-[40%]' : ''}`} />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const StatCardSkeleton = ({ count = 4 }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="card flex items-center gap-4 p-5">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
