const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-[#ff8800] border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;