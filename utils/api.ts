import { client } from "./microcms";

// TODO: 自動で型生成したい
export type Music = {
  id: string;
  title: string;
};

export type Setlist = {
  id: string;
  title: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  musics: Music[];
};

export const getTheBethSetlists = async (): Promise<Setlist[]> => {
  try {
    const res = await client.get({
      endpoint: "setlists",
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
    });

    return res;
  } catch (e: any) {
    // TODO: Handle error
    throw new Error(e.message);
  }
};
