const SkeletonLoader = () => {
  return (
    <div className="card bg-base-100 shadow-md">
      {/* Image Skeleton */}
      <div className="skeleton h-40 w-full"></div>

      <div className="card-body space-y-3">
        {/* Title */}
        <div className="skeleton h-5 w-3/4"></div>

        {/* Info lines */}
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-5/6"></div>
        <div className="skeleton h-4 w-2/3"></div>

        {/* Perks */}
        <div className="flex gap-2 mt-2">
          <div className="skeleton h-5 w-16 rounded-full"></div>
          <div className="skeleton h-5 w-16 rounded-full"></div>
          <div className="skeleton h-5 w-16 rounded-full"></div>
        </div>

        {/* Button */}
        <div className="skeleton h-8 w-full mt-3"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
