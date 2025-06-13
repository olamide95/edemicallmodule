import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <Skeleton className="h-10 w-[150px]" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle>
                  <Skeleton className="h-4 w-[120px]" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[60px] mb-2" />
                <Skeleton className="h-3 w-[100px]" />
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[240px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </div>

      {/* Tabs */}
      <Skeleton className="h-10 w-[400px] mb-4" />

      {/* Appointment Cards */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-[200px] mb-2" />
        <div className="space-y-4">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-1 h-[120px] bg-gray-200" />
                    <div className="p-4 flex-1">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div>
                            <Skeleton className="h-5 w-[150px] mb-2" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                        </div>
                        <div>
                          <Skeleton className="h-4 w-[80px] mb-2" />
                          <Skeleton className="h-5 w-[100px]" />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-[120px]" />
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-8 w-[100px]" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
