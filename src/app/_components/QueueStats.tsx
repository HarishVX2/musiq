type QueueStatsProps = {
  queueStats: {
    [key: string]: {
      totalVotes: number;
      activeUsers: number;
      songsPlayed: number;
    };
  };
  activeQueue: string;
};

export const QueueStats = ({ queueStats, activeQueue }: QueueStatsProps) => {
  return (
    <>
      <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold">Queue Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {queueStats[activeQueue]?.totalVotes ?? 0}
            </div>
            <div className="text-xs text-white/70">Total Votes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">
              {queueStats[activeQueue]?.activeUsers ?? 0}
            </div>
            <div className="text-xs text-white/70">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {queueStats[activeQueue]?.songsPlayed ?? 0}
            </div>
            <div className="text-xs text-white/70">Songs Played</div>
          </div>
        </div>
      </div>
    </>
  );
};
