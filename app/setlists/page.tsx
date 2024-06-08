import { Card } from "@/components";
import { getTheBethSetlists } from "@/utils/api";

export default async function Home() {
  const setlists = await getTheBethSetlists();
  return (
    <Card.List>
      {setlists.map((setlist) => (
        <Card
          href={`/setlists/${setlist.id}`}
          image={setlist.image}
          title={setlist.title}
          date={setlist.live_date}
          key={setlist.id}
        />
      ))}
    </Card.List>
  );
}
