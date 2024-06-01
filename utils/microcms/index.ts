import { createClient } from "microcms-js-sdk";

// https://document.microcms.io/tutorial/next/next-app-router-getting-started#h00f62a9315
export const client = createClient({
  serviceDomain: process.env.MICROCMS_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});
