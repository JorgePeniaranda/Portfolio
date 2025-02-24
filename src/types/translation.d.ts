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
      'collaborator': {
        nickname: {
          string: string;
          required_error: string;
        };
        githubUsername: {
          string: string;
        };
        linkedinUsername: {
          string: string;
        };
      };
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
      'project': {
        key: {
          string: string;
          required_error: string;
        };
        name: {
          string: string;
          required_error: string;
        };
        status: {
          enum: string;
        };
        stackCategory: {
          enum: string;
        };
        startDate: {
          date: string;
          required_error: string;
        };
        endDate: {
          date: string;
        };
        description: {
          string: string;
          required_error: string;
        };
        goals: {
          string: string;
          required_error: string;
        };
        contributions: {
          string: string;
          required_error: string;
        };
        logoUrl: {
          string: string;
          required_error: string;
        };
        primaryColor: {
          string: string;
          required_error: string;
          invalid_hex_color: string;
        };
        demoUrl: {
          string: string;
        };
        githubUrl: {
          string: string;
        };
      };
      'stack': {
        key: {
          string: string;
          required_error: string;
        };
        name: {
          string: string;
          required_error: string;
        };
        description: {
          string: string;
          required_error: string;
        };
        category: {
          enum: string;
        };
        type: {
          enum: string;
        };
        iconUrl: {
          string: string;
          required_error: string;
        };
      };
    };
  };
}
