// ==============================================
// Loader Component
// ==============================================
// A reusable loading spinner displayed while
// data is being fetched or auth state is loading.
// ==============================================

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 border-4 border-indigo-500/20 rounded-full animate-spin border-t-indigo-500"></div>
        {/* Inner glow */}
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping opacity-20 border-t-cyan-400"></div>
      </div>
    </div>
  );
};

export default Loader;
