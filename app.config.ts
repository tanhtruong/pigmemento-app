import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const ENV = process.env.APP_ENV || 'dev';
  const apiBaseUrl =
    ENV === 'prod'
      ? 'https://api.pigmemento.app'
      : ENV === 'staging'
        ? 'https://staging.api.pigmemento.app'
        : 'http://localhost:5197';

  return {
    ...config,
    name: 'Pigmemento',
    slug: 'pigmemento',
    extra: { apiBaseUrl },
  };
};
