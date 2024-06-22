import { createClient, createManagementClient } from "microcms-js-sdk";

const MICROCMS_CONFIG = {
  serviceDomain: process.env.MICROCMS_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
};
// https://document.microcms.io/tutorial/next/next-app-router-getting-started#h00f62a9315
export const client = createClient(MICROCMS_CONFIG);

export const managementClient = createManagementClient(MICROCMS_CONFIG);
