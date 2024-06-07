import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.bookish.app",
  appName: "capacitor-app",
  webDir: "build",
  server: {
    url: "http://10.2.164.158",
    cleartext: true,
  },
};

export default config;
