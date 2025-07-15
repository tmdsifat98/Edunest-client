const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-400px)]">
      <div className="w-16 h-16 border-4 border-[#ff8800] border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;