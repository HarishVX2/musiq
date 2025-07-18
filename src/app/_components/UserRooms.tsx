import { Calendar, Music, Users, ArrowRight } from "lucide-react";

type Room = {
  id: string;
  name: string;
  createdAt: Date;
};

type UserRoomsProps = {
  userRooms: Room[] | undefined;
};

export const UserRooms = ({ userRooms }: UserRoomsProps) => {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center text-xl font-semibold text-white">
        <Music className="mr-2 h-5 w-5 text-purple-400" />
        Your Rooms
      </h2>
      <div className="space-y-3">
        {userRooms?.length === 0 ? (
          <p className="py-8 text-center text-white/70">
            You haven't created any rooms yet. Create your first room to get
            started!
          </p>
        ) : (
          userRooms?.map((room) => (
            <div
              key={room.id}
              className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-4 transition-colors hover:bg-white/20"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  {/* {room.isPrivate ? (
                          <Lock className="h-5 w-5 text-yellow-400" />
                        ) : (
                          <Unlock className="h-5 w-5 text-green-400" />
                        )} */}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{room.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-white/70">
                    <span className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {/* {room.participantCount}/{room.maxParticipants} */}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(room.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                // onClick={() => router.push(`/room/${room.id}`)}
                className="flex items-center space-x-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
              >
                <span>Enter</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
