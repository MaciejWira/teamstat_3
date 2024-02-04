import { graphql } from "@/gql";

export const document = graphql(`
  query GetGame($id: ID!) {
    game(id: $id, idType: SLUG) {
      acf {
        gameDate
        gameTeam1 {
          captain {
            ... on Player {
              ...PlayerFragment
            }
          }
          players {
            ... on Player {
              ...PlayerFragment
            }
          }
          goals
        }
        gameTeam2 {
          captain {
            ... on Player {
              ...PlayerFragment
            }
          }
          players {
            ... on Player {
              ...PlayerFragment
            }
          }
          goals
        }
      }
    }
  }
`);
