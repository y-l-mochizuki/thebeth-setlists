import { createClient, createManagementClient } from "microcms-js-sdk";

const MICROCMS_CONFIG = {
  serviceDomain: process.env.MICROCMS_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
};

const MICROCMS_PLAYLIST_CONFIG = {
  serviceDomain: process.env.MICROCMS_PLAYLIST_DOMAIN || "",
  apiKey: process.env.MICROCMS_PLAYLIST_API_KEY || "",
};

// https://document.microcms.io/tutorial/next/next-app-router-getting-started#h00f62a9315
export const client = createClient(MICROCMS_CONFIG);

export const playlistClient = createClient(MICROCMS_PLAYLIST_CONFIG);

export const managementClient = createManagementClient(MICROCMS_CONFIG);

export const ENDPOINT = {
  PLAYLISTS: "playlist",
} as const;

export const customRequestInit = {
  next: {
    revalidate: Number(process.env.NEXT_PUBLIC_MICROCMS_CACHE_TIME || 3600), // キャッシュの有効期限（秒） 3600秒 = 1時間
  },
};

export * from "./playlist";
