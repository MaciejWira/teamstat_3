import { graphql } from "@/gql";

export const document = graphql(`
  query GetPlayer($id: ID!) {
    player(id: $id, idType: SLUG) {
      title
      databaseId
    }
  }
`);
