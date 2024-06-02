export const toJstDate = (utcDateString: string): string => {
  const utcDate = new Date(utcDateString);
  const jstOffset = 9 * 60; // 日本標準時のオフセット（分）
  const jstDate = new Date(utcDate.getTime() + jstOffset * 60 * 1000);

  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため1を加える
  const day = String(jstDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
