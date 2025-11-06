// sanity/client.ts

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./env";

export const client = createClient({
  apiVersion,
  dataset: dataset || "production",
  projectId: projectId || "dummy",
  useCdn,
});
