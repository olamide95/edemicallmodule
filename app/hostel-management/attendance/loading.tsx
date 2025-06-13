export default function Loading() {
  return (
    <div className="flex h-screen">
      <div className="w-[260px] border-r border-divider bg-light-bg dark:bg-dark-bg animate-pulse" />

      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-divider bg-light-bg dark:bg-dark-bg animate-pulse" />

        <main className="flex-1 overflow-y-auto bg-light-bg dark:bg-[#28243D] p-6">
          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg h-48 animate-pulse mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg h-24 animate-pulse" />
            ))}
          </div>

          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg h-20 animate-pulse mb-6" />

          <div className="bg-light-card-bg dark:bg-dark-card-bg rounded-lg h-96 animate-pulse" />
        </main>
      </div>
    </div>
  )
}
