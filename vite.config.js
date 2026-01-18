import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/stock-exchange-ons/",
  plugins: [react()]
});
