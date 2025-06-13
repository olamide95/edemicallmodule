export default function Loading() {
  return (
    <div className="flex h-screen">
      <div className="w-[260px] bg-light-bg dark:bg-dark-bg border-r border-divider animate-pulse" />

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-white dark:bg-dark-card-bg border-b border-divider animate-pulse" />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6 mb-6">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mb-6 animate-pulse" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-[#F9FAFB] dark:bg-[#28243D] p-4 rounded-lg">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2 animate-pulse" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#312D4B] rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.05)]"
                >
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2 animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
                  </div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
