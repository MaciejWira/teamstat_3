import { print } from "graphql";
import { wpgqlPath } from "@/constants";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";

export type GQLQuery<TResult, TVariables> = {
  document: TypedDocumentNode<TResult, TVariables>;
  variables?: TVariables;
};

const fetchOptions = (tags: string[]) => ({
  next: {
    tags: [...tags],
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDataFetch = async <TResult, TVariables>({
  document,
  variables,
  tags = [],
}: GQLQuery<TResult, TVariables> & {
  tags?: string[];
}): Promise<TResult> => {
  const response = await fetch(wpgqlPath, {
    method: "POST",
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
    ...fetchOptions(tags),
  });

  if (response.status !== 200) {
    throw new Error(
      `Failed to fetch: ${response.statusText}. Body: ${await response.text()}`
    );
  }

  const json = await response.json();
  return json.data;
};
