import type { CapacitorConfig } from '@capacitor/cli';
import path from "path";

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'bookish',
  webDir: 'out',
  "server": {
    "url": process.env.SERVER_URL || "http://localhost:3000",
    "cleartext": true
  },
};

export default config;
