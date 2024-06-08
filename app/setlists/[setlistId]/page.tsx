import { DetailPage } from "@/components";
import { getTheBethSetlist } from "@/utils/api";

type Props = {
  params: {
    setlistId: string;
  };
};

export default async function Home({ params }: Props) {
  const setlist = await getTheBethSetlist(params.setlistId);
  return <DetailPage content={setlist} />;
}
