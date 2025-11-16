import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const ENV = process.env.APP_ENV || 'dev';
  const apiBaseUrl = 'https://api.pigmemento.app';
  // ENV === "prod" ? "https://api.pigmemento.app" : "http://10.0.2.2:5197";
  //   : ENV === "staging"
  //   ? "https://staging.api.pigmemento.app"

  return {
    ...config,
    name: 'Pigmemento',
    slug: 'pigmemento',
    extra: { apiBaseUrl },
  };
};
