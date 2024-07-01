import { playlistClient, customRequestInit, ENDPOINT } from "@/utils/microcms";

interface MusicId {
  fieldId: "music_id";
  music_id: string;
}

export interface Playlist {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  poster: string;
  music_ids: MusicId[];
}

export const getPlaylists = async () => {
  try {
    const res = await playlistClient.getList<Playlist>({
      endpoint: ENDPOINT.PLAYLISTS,
      customRequestInit,
      queries: {
        limit: 100, // 最大取得件数
      },
    });

    return res.contents;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const getPlaylist = async (playlistId: string) => {
  try {
    const res = await playlistClient.getListDetail<Playlist>({
      endpoint: ENDPOINT.PLAYLISTS,
      contentId: playlistId,
      customRequestInit,
    });

    return res;
  } catch (e: any) {
    throw new Error(e);
  }
};
