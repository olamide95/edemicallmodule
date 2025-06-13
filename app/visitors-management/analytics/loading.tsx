import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg overflow-hidden shadow-sm p-6">
        <div className="flex justify-between">
          <div className="space-y-4 w-[60%]">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
          <Skeleton className="h-48 w-96" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <Skeleton className="h-4 w-40" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
            <div className="space-y-2 mb-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-[300px] w-full" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
        <div className="space-y-2 mb-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
