const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-700 border-t-teal-400 rounded-full animate-spin"></div>

        <p className="text-zinc-400">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;