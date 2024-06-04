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
};

const customRequestInit = {
  next: {
    revalidate: 3600, // 1時間でページを再読み込み、キャッシュを利用する
  },
};

export const getTheBethSetlists = async (): Promise<Setlist[]> => {
  try {
    const res = await client.get({
      endpoint: "setlists",
      queries: {
        orders: "-live_date", // 開催日の降順
      },
      customRequestInit,
    });

    return res.contents;
  } catch (e: any) {
    // TODO: Handle error
    throw new Error(e.message);
  }
};

export const getThebethSetlist = async (id: string): Promise<Setlist> => {
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
