import React, {
  type Dispatch,
  type FC,
  type FormEvent,
  type SetStateAction,
} from "react";

type form = {
  name: string;
  passcode: string;
};
type CreateRoomModalProps = {
  createForm: form;
  setCreateForm: Dispatch<SetStateAction<form>>;
  setShowCreateForm: (show: boolean) => void;
  handleCreateRoom: (e: FormEvent) => void;
  createRoomMutation: {
    isPending: boolean;
  };
};

export const CreateRoomModal: FC<CreateRoomModalProps> = ({
  createForm,
  setCreateForm,
  setShowCreateForm,
  handleCreateRoom,
  createRoomMutation,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Create New Room
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/70">
              Room Name
            </label>
            <input
              type="text"
              value={createForm.name}
              onChange={(e) =>
                setCreateForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter room name"
            />
          </div>
          {/* <div>
                <label className="mb-2 block text-sm text-white/70">
                  Max Participants
                </label>
                <input
                  type="number"
                  min="2"
                  max="50"
                  // value={createForm.maxParticipants}
                  onChange={(e) =>
                    setCreateForm((prev) => ({
                      ...prev,
                      maxParticipants: parseInt(e.target.value),
                    }))
                  }
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div> */}
          {/* <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private"
                  // checked={createForm.isPrivate}
                  // checked={true}
                  onChange={(e) =>
                    setCreateForm((prev) => ({
                      ...prev,
                      isPrivate: e.target.checked,
                    }))
                  }
                  className="rounded border-white/20 text-purple-600 focus:ring-purple-400"
                />
                <label htmlFor="private" className="text-sm text-white/70">
                  Make room private
                </label>
              </div> */}

          <div>
            <label className="mb-2 block text-sm text-white/70">Passcode</label>
            <input
              type="password"
              value={createForm.passcode}
              onChange={(e) =>
                setCreateForm((prev) => ({
                  ...prev,
                  passcode: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Enter password"
            />
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => setShowCreateForm(false)}
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateRoom}
            disabled={!createForm.name || createRoomMutation.isPending}
            className="flex-1 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 disabled:bg-gray-600"
          >
            {createRoomMutation.isPending ? "Creating..." : "Create Room"}
          </button>
        </div>
      </div>
    </div>
  );
};
