import { Setlist, getTheBethSetlists } from "@/utils/api";
import { Card, CategoryTab } from "@/components";

type ExpansionSetlist = Setlist & {
  isExternal?: boolean;
  href?: string;
};

export default async function Home() {
  const setlists = await getTheBethSetlists();
  const filteredTheBethSetlists = setlists.filter(
    (setlist) => setlist.category?.thebest_thebeth,
  );
  const filteredTaibanSetlists = setlists.filter(
    (setlist) => setlist.category?.taiban,
  );
  const filteredSponsorshipSetlists = setlists.filter(
    (setlist) => setlist.category?.sponsorship,
  );

  return (
    <div className="grid gap-4">
      <CategoryTab
        all={<Tab setlists={setlists} />}
        thebest_thebeth={<Tab setlists={filteredTheBethSetlists} />}
        taiban={<Tab setlists={filteredTaibanSetlists} />}
        sponsorship={<Tab setlists={filteredSponsorshipSetlists} />}
      />
    </div>
  );
}

type TabProps = {
  setlists: ExpansionSetlist[];
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
