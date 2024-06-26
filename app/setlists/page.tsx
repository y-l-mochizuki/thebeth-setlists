import { Setlist, getTheBethSetlists } from "@/utils/api";
import { Card, CategoryTab } from "@/components";

type ExpansionSetlist = Setlist & {
  isExternal?: boolean;
  href?: string;
};

// FIXME: ザ・ベストザベスFINALが終わったら削除する
const thebest_thebeth_final = {
  id: "thebest_thebeth_final",
  title: "ザ・ベストザベスFINAL",
  live_date: "2024-07-15T00:00:00.000Z",
  href: "https://tiget.net/events/325136",
  isExternal: true,
  musics: [],
  image: {
    url: "https://images.microcms-assets.io/assets/29e4ee16780c4731b686e98c0446379c/a9261b378f434fb4b04996414468bc9e/635ce73c-1537-44d3-ad6d-87642768dbb3.png",
    width: 168,
    height: 168,
  },
  category: {
    thebest_thebeth: true,
    taiban: false,
    sponsorship: true,
  },
} satisfies ExpansionSetlist;

export default async function Home() {
  const setlists = await getTheBethSetlists();
  const addedThebestThebethFinal = [thebest_thebeth_final, ...setlists]; // FIXME: ザ・ベストザベスFINALが終わったら削除する
  const filteredTheBethSetlists = addedThebestThebethFinal.filter(
    (setlist) => setlist.category?.thebest_thebeth,
  );
  const filteredTaibanSetlists = addedThebestThebethFinal.filter(
    (setlist) => setlist.category?.taiban,
  );
  const filteredSponsorshipSetlists = addedThebestThebethFinal.filter(
    (setlist) => setlist.category?.sponsorship,
  );

  return (
    <div className="grid gap-4">
      <CategoryTab
        all={<Tab setlists={addedThebestThebethFinal} />}
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
          href={
            setlist.isExternal && setlist.href
              ? setlist.href // FIXME: ザ・ベストザベスFINALが終わったら削除する
              : `/setlists/${setlist.id}`
          }
          date={setlist.live_date}
          key={setlist.id}
        />
      ))}
    </Card.List>
  );
};
