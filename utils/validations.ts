import { SetlistPostData } from "./api";

export function isValidSetlistPostData(data: any): data is SetlistPostData {
  return (
    typeof data.image === "string" &&
    typeof data.title === "string" &&
    typeof data.category === "object" &&
    typeof data.live_date === "string" &&
    Array.isArray(data.musics) &&
    Array.isArray(data.purchase_links)
  );
}
