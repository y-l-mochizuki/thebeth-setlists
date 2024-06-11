import { Setlist, getTheBethSetlists } from "@/utils/api";
import { Card } from "@/components";
import { CategoryTabs } from "./CategoryTabs";

export default async function Home() {
  const setlists = await getTheBethSetlists();
  const filteredTheBethSetlists = setlists.filter(
    (setlist) => setlist.category?.thebest_thebeth,
  );
  const filteredTaibanSetlists = setlists.filter(
    (setlist) => setlist.category?.taiban,
  );

  return (
    <div className="grid gap-4">
      <CategoryTabs
        all={<Tab setlists={setlists} />}
        thebest_thebeth={<Tab setlists={filteredTheBethSetlists} />}
        taiban={<Tab setlists={filteredTaibanSetlists} />}
      />
    </div>
  );
}

type TabProps = {
  setlists: Setlist[];
};
const Tab = ({ setlists }: TabProps) => {
  return (
    <Card.List>
      {setlists.map((setlist) => (
        <Card
          {...setlist}
          href={`/setlists/${setlist.id}`}
          date={setlist.live_date}
          key={setlist.id}
        />
      ))}
    </Card.List>
  );
};
