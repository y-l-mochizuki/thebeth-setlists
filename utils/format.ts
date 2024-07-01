import { DateValue } from "@nextui-org/react";

export const toJstDate = (
  utcDateString: string,
  isJapaneseFormat = false,
): string => {
  const utcDate = new Date(utcDateString);
  const jstOffset = 9 * 60; // 日本標準時のオフセット（分）
  const jstDate = new Date(utcDate.getTime() + jstOffset * 60 * 1000);

  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため1を加える
  const day = String(jstDate.getDate()).padStart(2, "0");

  return isJapaneseFormat
    ? `${year}年${month}月${day}日`
    : `${year}-${month}-${day}`;
};

export const identifyURL = (url: string) => {
  if (url.includes("amzn.asia") || url.includes("amazon.co.jp")) {
    return "Amazon";
  }

  if (url.includes("tower.jp")) {
    return "タワーレコード";
  }

  if (url.includes("thebeth.official.ec")) {
    return "THE BETH オフィシャル WEB ショップ";
  }

  return "外部サイト";
};

export const dateValueToJSTISOString = (
  date: DateValue | null,
): string | null => {
  if (!date) {
    return null;
  }

  // yearプロパティが存在しない場合は現在の年を使用
  const year = date.year ?? new Date().getFullYear();

  // 日本時間（JST）の日付オブジェクトを作成
  const jstDate = new Date(year, date.month - 1, date.day, 9, 0, 0); // 9時間を加算

  // ISO 8601形式の文字列を生成（日本時間）
  const isoString = jstDate.toISOString().replace("Z", "+09:00");

  return isoString;
};
