const CardSkeleton = () => {
  return (
    <div className="relative h-[60vh] w-full md:min-w-[200px] bg-gray-100 p-4 rounded-md flex flex-col gap-4 shadow-lg animate-pulse">
      <div className="h-5 w-24 bg-gray-300 rounded-md"></div>

      <div className="h-6 w-16 bg-gray-300 rounded-md"></div>

      <div className="h-4 w-20 bg-gray-300 rounded-md"></div>

      <div className="flex flex-col gap-2">
        <div className="h-4 w-28 bg-gray-300 rounded-md"></div>
        <div className="h-24 w-24 bg-gray-300 rounded-full self-center"></div>
      </div>

      <div className="absolute right-2 top-2 h-6 w-6 bg-gray-300 rounded-full"></div>
    </div>
  );
};

export default CardSkeleton;
