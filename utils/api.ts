import { client } from "./microcms";

type IframeString = {
  src: string;
};

// TODO: 自動で型生成したい
export type Music = {
  id: string;
  title: string;
  iframe_strings: IframeString[] | null;
};

type Category = {
  thebest_thebeth: boolean;
  taiban: boolean;
};

export type Setlist = {
  id: string;
  title: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  live_date?: string;
  musics: Music[];
  purchase_links?: {
    link: string;
  }[];
  category?: Category;
};

const customRequestInit = {
  next: {
    revalidate: Number(process.env.NEXT_PUBLIC_MICROCMS_CACHE_TIME || 3600), // キャッシュの有効期限（秒） 3600秒 = 1時間
  },
};

export const getTheBethSetlists = async (): Promise<Setlist[]> => {
  try {
    const res = await client.get({
      endpoint: "setlists",
      queries: {
        orders: "-live_date", // 開催日の降順
        limit: 100, // 最大取得件数
      },
      customRequestInit,
    });

    return res.contents;
  } catch (e: any) {
    // TODO: Handle error
    throw new Error(e.message);
  }
};

export const getTheBethSetlist = async (id: string): Promise<Setlist> => {
  try {
    const res = await client.get({
      endpoint: "setlists",
      contentId: id,
      customRequestInit,
    });

    return res;
  } catch (e: any) {
    // TODO: Handle error
    throw new Error(e.message);
  }
};

export type AlbumType = {
  id: string;
  title: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  musics: Music[];
  purchase_links?: {
    link: string;
  }[];
  release_date: string;
};

export const getTheBethAlbums = async (): Promise<AlbumType[]> => {
  try {
    const res = await client.get({
      endpoint: "albums",
      queries: {
        orders: "-release_date", // 開催日の降順
        limit: 100, // 最大取得件数
      },
      customRequestInit,
    });

    return res.contents;
  } catch (e: any) {
    // TODO: Handle error
    throw new Error(e.message);
  }
};

export const getTheBethAlbum = async (id: string): Promise<AlbumType> => {
  try {
    const res = await client.get({
      endpoint: "albums",
      contentId: id,
      customRequestInit,
    });

    return res;
  } catch (e: any) {
    // TODO: Handle error
    throw new Error(e.message);
  }
};

export const getMusics = async (): Promise<Music[]> => {
  try {
    const res = await client.get({
      endpoint: "musics",
      customRequestInit,
      queries: {
        limit: 100, // 最大取得件数
      },
    });

    return res.contents;
  } catch (e: any) {
    // TODO: Handle error
    throw new Error(e.message);
  }
};
