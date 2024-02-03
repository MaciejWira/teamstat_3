import getGames from "@/services/getGames";
import Heading from "@/components/server/Heading";
import ListingGames from "@/components/server/ListingGames";

export default async function GamesPage() {
  const { games } = await getGames();

  return (
    <div>
      <Heading>Mecze</Heading>
      <ListingGames games={games || []} />
    </div>
  );
}
