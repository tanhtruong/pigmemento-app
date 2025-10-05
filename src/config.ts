import Constants from "expo-constants";

export const CONFIG = {
  API_BASE_URL:
    (Constants?.expoConfig?.extra as any)?.apiBaseUrl || "http://10.0.2.2:5197",
};
