import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

declare const process: {
  env: Record<string, string | undefined>;
};

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const githubPagesBase = `/${repoName ?? "RahoolPortfolio.com"}/`;
const base =
  process.env.VITE_SITE_BASE ??
  (process.env.GITHUB_ACTIONS === "true" ? githubPagesBase : "/");

export default defineConfig({
  base,
  plugins: [react()],
});
