import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const ENV = process.env.APP_ENV || 'dev';
  // const apiBaseUrl = 'https://api.pigmemento.app';
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
    userInterfaceStyle: 'automatic',
    ios: {
      ...(config.ios || {}),
      userInterfaceStyle: 'automatic',
    },
    android: {
      ...(config.android || {}),
      userInterfaceStyle: 'automatic',
    },
    extra: { apiBaseUrl },
  };
};
