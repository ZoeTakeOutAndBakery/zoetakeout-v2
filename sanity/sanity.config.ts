import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || "production";

if (!projectId) {
  console.warn("SANITY_PROJECT_ID is not set. Studio will not function without it.");
}

export default defineConfig({
  name: "default",
  title: "Zoe Bakes Bites",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
