import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts", "tools/**"]),
  {
    rules: {
      /* استفاده از تگ img برای حفظ دقیق چیدمان نسخه اصلی (تصاویر خارجی) */
      "@next/next/no-img-element": "off",
    },
  },
]);
