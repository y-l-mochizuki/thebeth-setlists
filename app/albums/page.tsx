import { getTheBethAlbums } from "@/utils/api";
import { Card } from "@/components";

export default async function Home() {
  const albums = await getTheBethAlbums();
  return (
    <Card.List>
      {albums
        .filter((album) => !album.isArchived)
        .map((album) => (
          <Card
            href={`/albums/${album.id}`}
            image={album.image}
            title={album.title}
            date={album.release_date}
            key={album.id}
          />
        ))}
    </Card.List>
  );
}
