import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm">
        <div className="p-6 relative">
          <div className="max-w-[60%]">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-48 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full flex items-center">
            <Skeleton className="h-[200px] w-[400px]" />
          </div>
        </div>
      </div>

      {/* Stats Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-start">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-[600px]" />
        <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm">
          <div className="p-4">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64 mb-4" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border rounded-md p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
