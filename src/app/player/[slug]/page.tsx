import getGames from "@/services/getGames";
import Heading from "@/components/server/Heading";
import ListingGames from "@/components/server/ListingGames";
import { StaticPageProps } from "@/types/page";
import getPlayer from "@/services/getPlayer";

export default async function GamesPage({ params: { slug } }: StaticPageProps) {
  const { player } = await getPlayer(slug);
  const { games } = await getGames({ playerId: player?.databaseId });

  return (
    <div>
      <Heading>{player?.title}</Heading>
      <ListingGames games={games || []} />
    </div>
  );
}
