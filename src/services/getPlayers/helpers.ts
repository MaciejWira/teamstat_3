import { graphql } from "@/gql";

// TODO: first 100 might be replaced

export const document = graphql(`
  query GetPlayers {
    players(first: 100) {
      nodes {
        custom_fields {
          excludeFromTables
        }
        databaseId
      }
    }
  }
`);
