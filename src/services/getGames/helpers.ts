import { graphql } from "@/gql";

// TODO: first 100 might be replaced

export const document = graphql(`
  query GetGames($month: Int, $year: Int) {
    games(first: 100, where: { dateQuery: { month: $month, year: $year } }) {
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
        slug
        title
      }
    }
  }

  fragment PlayerFragment on Player {
    databaseId
    slug
    title
  }
`);
