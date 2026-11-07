import { mkdir, writeFile } from "node:fs/promises";
import { GITHUB_USERNAME } from "../src/constants.js";

const token = process.env.GH_CONTRIBUTIONS_TOKEN;
if (!token) {
  throw new Error("GH_CONTRIBUTIONS_TOKEN must be set to fetch private contributions");
}

const to = new Date();
const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000);
const response = await fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            totalCommitContributions
          }
        }
      }
    `,
    variables: {
      login: GITHUB_USERNAME,
      from: from.toISOString(),
      to: to.toISOString(),
    },
  }),
});

if (!response.ok) {
  throw new Error(`GitHub GraphQL API returned ${response.status}`);
}

const result = await response.json();
if (result.errors?.length) {
  throw new Error(`GitHub GraphQL API error: ${result.errors[0].message}`);
}

const count = result.data?.user?.contributionsCollection?.totalCommitContributions;
if (!Number.isInteger(count) || count < 0) {
  throw new Error("GitHub GraphQL API returned an invalid contribution count");
}

await mkdir(new URL("../public/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../public/github-contributions.json", import.meta.url),
  JSON.stringify({ count, updatedAt: to.toISOString() }),
);
