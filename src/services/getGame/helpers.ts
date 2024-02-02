import { graphql } from "@/gql";

export const document = graphql(`
  query GetGame($id: ID!) {
    game(id: $id, idType: SLUG) {
      acf {
        gameDate
        gameTeam1 {
          captain {
            ... on Player {
              databaseId
              title
            }
          }
          players {
            ... on Player {
              databaseId
              title
            }
          }
          goals
        }
        gameTeam2 {
          captain {
            ... on Player {
              databaseId
              title
            }
          }
          players {
            ... on Player {
              databaseId
              title
            }
          }
          goals
        }
      }
    }
  }
`);
