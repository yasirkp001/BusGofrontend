const Loader = ({ label = 'Loading…', fullScreen = false, className = '' }) => {
  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 text-slate-500 ${className}`}>
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-500" />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
  if (fullScreen) {
    return <div className="flex min-h-[60vh] items-center justify-center">{spinner}</div>;
  }
  return <div className="py-10">{spinner}</div>;
};

export default Loader;
