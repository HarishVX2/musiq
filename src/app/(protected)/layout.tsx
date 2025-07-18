import { Music, Users } from "lucide-react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Music className="h-8 w-8 text-purple-400" />
                <h1 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
                  MusiQ
                </h1>
              </div>
              {/* <div className="hidden items-center space-x-1 rounded-full bg-white/10 p-1 md:flex">
              {Object.keys(queues).map((queue) => (
                <button
                  key={queue}
                  onClick={() => setActiveQueue(queue)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    activeQueue === queue
                      ? "bg-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {queue.charAt(0).toUpperCase() + queue.slice(1)}
                </button>
              ))}
            </div> */}
            </div>
            <div className="flex items-center space-x-4">
              {/* <div className="text-right">
              <div className="text-sm text-white/70">Active Users</div>
              <div className="text-xl font-bold">
                {queueStats[activeQueue].activeUsers}
              </div>
            </div> */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
