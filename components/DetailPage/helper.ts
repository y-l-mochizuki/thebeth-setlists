import { AlbumType, Setlist } from "@/utils/api";

type HasLiveDateSetlistType = Omit<Setlist, "live_date"> & {
  live_date: string;
};

export const isSetlistTypeWithLiveDate = (
  content: AlbumType | Setlist,
): content is HasLiveDateSetlistType => {
  return "live_date" in content && content.live_date !== undefined;
};

type HasReleaseDateAlbumType = Omit<Setlist, "release_date"> & {
  release_date: string;
};

export const isAlbumTypeWithReleaseDate = (
  content: AlbumType | Setlist,
): content is HasReleaseDateAlbumType => {
  return "release_date" in content;
};

type Links = (AlbumType | Setlist)["purchase_links"];

type RemovedUndefinedLinks = Exclude<Links, undefined>;

export const hasValidPurchaseLinks = (
  links: Links,
): links is RemovedUndefinedLinks => {
  return !!links && links.length > 0;
};
