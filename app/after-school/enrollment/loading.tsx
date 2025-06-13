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
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="absolute right-0 top-0 h-full flex items-center">
            <Skeleton className="h-[200px] w-[400px]" />
          </div>
        </div>
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-8 w-16" />
              </div>
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg shadow-sm overflow-hidden">
        {/* Toolbar Skeleton */}
        <div className="p-4 border-b border-divider flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-grow">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="px-4 pt-2">
          <Skeleton className="h-10 w-full max-w-md" />
        </div>

        {/* Table Skeleton */}
        <div className="p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-divider">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
