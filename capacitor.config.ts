import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'bookish',
  webDir: 'out',
  "server": {
    "url": process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
    "cleartext": true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    },
  },
};

export default config;
