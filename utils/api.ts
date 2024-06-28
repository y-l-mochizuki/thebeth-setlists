import { client, managementClient } from "./microcms";

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
  fieldId?: string;
  thebest_thebeth: boolean;
  taiban: boolean;
  sponsorship: boolean;
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

export type SetlistPostData = {
  image: string;
  title: string;
  category: Category;
  live_date: string; // ISO 8601形式の日付文字列
  musics: string[]; // music.idの配列
  purchase_links?: {
    link: string;
  }[];
};

export const postImage = async (base64Data: string): Promise<string> => {
  try {
    // MIMEタイプの検出（この例ではJPEGを想定）
    const mimeType = "image/jpeg";

    // Base64データをバッファに変換
    const buffer = Buffer.from(base64Data, "base64");

    // ファイル名の生成
    const fileName = `image_${Date.now()}.jpg`;

    // バッファをBlobに変換
    const blob = new Blob([buffer], { type: mimeType });

    // microCMSにアップロード
    const { url } = await managementClient.uploadMedia({
      data: blob,
      name: fileName,
    });

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while uploading the image");
    }
  }
};

export const createThebethSetlist = async (
  setlist: SetlistPostData,
): Promise<void> => {
  try {
    const res = await client.create({
      endpoint: "setlists",
      content: setlist,
    });
  } catch (e: any) {
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
  isArchived?: boolean;
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
