import { Clock, Play } from "lucide-react";

export const Queue = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="lg:col-span-2">
      <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center text-xl font-semibold">
            <Play className="mr-2 h-5 w-5 text-purple-400" />
            Queue
          </h2>
          <div className="flex items-center space-x-2 text-sm text-white/70">
            <Clock className="h-4 w-4" />
            <span>Live voting</span>
          </div>
        </div>

        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
};
