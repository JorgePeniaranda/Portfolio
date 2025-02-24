type GetTranslationKey<T, P extends string = ''> = T extends string | number | boolean
  ? P
  : {
      [K in keyof T]: GetTranslationKey<
        T[K],
        P extends '' ? `${string & P}${K}` : `${P}.${string & K}`
      >;
    }[keyof T];

export type TranslationKey = GetTranslationKey<Translation>;

export interface Translation {
  'components': {
    organisms: {
      home: {
        bla: string;
      };
    };
  };
  'services': {
    test: {
      bla: string;
    };
  };
  'http-response': {
    response: {
      'not-found': string;
    };
  };
  'error': {
    'validation-message': {
      'env': {
        appVersion: {
          string: string;
          required_error: string;
        };
        mode: {
          string: string;
          required_error: string;
        };
        isProduction: {
          boolean: string;
          required_error: string;
        };
        isDevelopment: {
          boolean: string;
          required_error: string;
        };
        isServerSideEnable: {
          boolean: string;
          required_error: string;
        };
        assetsPrefix: {
          string: string;
        };
        siteUrl: {
          string: string;
          url: string;
          required_error: string;
        };
        baseUrl: {
          string: string;
          required_error: string;
        };
        apiUrl: {
          string: string;
          url: string;
          required_error: string;
        };
        secretCode: {
          string: string;
          required_error: string;
        };
      };
      'entity-relation': {
        idSource: {
          number: string;
          required_error: string;
        };
        idTarget: {
          number: string;
          required_error: string;
        };
      };
    };
  };
}
