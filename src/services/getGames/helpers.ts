import { graphql } from "@/gql";

export const document = graphql(`
  query GetGames {
    games(first: 100) {
      nodes {
        acf {
          gameBlowOut
          gameDate
          gameTeam1 {
            captain {
              ...PlayerFragment
            }
            goals
            players {
              ...PlayerFragment
            }
          }
          gameTeam2 {
            captain {
              ...PlayerFragment
            }
            goals
            players {
              ...PlayerFragment
            }
          }
        }
        databaseId
        title
      }
    }
  }
`);

const PlayerFragment = graphql(`
  fragment PlayerFragment on Player {
    databaseId
    title
  }
`);
