import { create } from "zustand";

export type SongType = {
  id: string;
  name: string;
  artist: string;
  url: string;
  _count: {
    vote: number;
  };
  addedById: string;
  timeAdded?: string;
  status?: string;
  duration?: string;
  album?: string;
};

interface MusicState {
  currentSong: SongType | null;
  isPlaying: boolean;
  songs: SongType[];
  setSongs: (songs: SongType[]) => void;
  playSong: (song: SongType) => void;
  pauseSong: () => void;
  voteForSong: (songId: string, increment?: boolean) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  currentSong: null,
  isPlaying: false,
  songs: [],
  setSongs: (songs) => set({ songs }),
  playSong: (song) =>
    set((state) => ({
      songs: state.songs.map((s) => ({
        ...s,
        status: s.id === song.id ? "playing" : undefined,
      })),
      currentSong: { ...song, status: "playing" },
      isPlaying: true,
    })),
  pauseSong: () =>
    set((state) => ({
      songs: state.songs.map((s) => ({ ...s, status: undefined })),
      currentSong: state.currentSong
        ? { ...state.currentSong, status: undefined }
        : null,
      isPlaying: false,
    })),
  voteForSong: (songId, increment = true) =>
    set((state) => ({
      songs: state.songs.map((song) =>
        song.id === songId
          ? {
              ...song,
              _count: {
                ...song._count,
                vote: increment
                  ? song._count.vote + 1
                  : Math.max(0, song._count.vote - 1),
              },
            }
          : song,
      ),
    })),
}));
