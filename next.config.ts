import type { NextConfig } from "next";

// The default build targets Cloudflare Workers through vinext. Setting
// STATIC_EXPORT=1 switches to a plain static build for GitHub Pages instead,
// so both deployment targets keep working from the same source.
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      trailingSlash: true,
      basePath: basePath || undefined,
      images: { unoptimized: true },
      typescript: { tsconfigPath: "tsconfig.export.json" },
    }
  : {};

export default nextConfig;
