import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="flex flex-col gap-y-2 w-[850px] xl:[3000px] p-3">
      <Skeleton className="h-[80px] w-[80px] rounded-full" />
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-[24px] w-[60%]" />
        <Skeleton className="h-[20px] w-[40%]" />
      </div>
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-[16px] w-[40%]" />
        <Skeleton className="h-[16px] w-[50%]" />
        <Skeleton className="h-[16px] w-[60%]" />
      </div>
      <Skeleton className="h-[80px] w-[80px] rounded-full" />
      <div className="flex items-center space-y-2">
        <div className="flex flex-col">
          <Skeleton className="h-[24px] w-[60%]" />
          <Skeleton className="h-[20px] w-[40%]" />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-[16px] w-[40%]" />
        <Skeleton className="h-[16px] w-[50%]" />
        <Skeleton className="h-[16px] w-[60%]" />
      </div>
    </div>
  );
};

export default LoadingState;
