import { client } from "./microcms";

// TODO: 自動で型生成したい
type Music = {
  id: string;
  title: string;
};

type Setlist = {
  id: string;
  title: string;
  image?: {
    url: string;
    width: number;
    height: number;
  };
  musics: Music[];
};

type Content<T = {}> = {
  id: string;
} & T;

export const getTheBethSetlists = async (): Promise<
  Content<{ setlist: Setlist }>[]
> => {
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
