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
  components: {
    'cat-as-a-service': {
      'aria-label': string;
    };
    'conditional-anchor': {
      'disabled-aria-label': string;
    };
    'github-user': {
      'aria-label': string;
    };
    'text-writter': {
      'aria-label': string;
    };
    'secret-code-hint': {
      'aria-label': string;
    };
    'collaborator-relationship-card': {
      'aria-label': string;
    };
    'project-card': {
      'aria-label': string;
      'aria-label-liked': string;
    };
    'secret-button': {
      'error-description': string;
      'error-message': string;
      'success-description': string;
      'success-message': string;
      'button-text': string;
      'modal-title': string;
      'modal-description': string;
      'modal-unlock-button': string;
      'modal-submit-button': string;
    };
    'project-accordion': {
      goals: {
        title: string;
      };
      technologies: {
        title: string;
      };
      contributions: {
        title: string;
      };
      collaborators: {
        title: string;
      };
      resources: {
        'title': string;
        'code-subtitle': string;
        'demo-subtitle': string;
      };
    };
    'breadcrumb': {
      'aria-label': string;
    };
    'breadcrumb-item': {
      'link-aria-label': string;
      'page-aria-label': string;
    };
    'update-collaborator-related-project': {
      'success-title': string;
      'success-description': string;
      'error-title': string;
      'error-description': string;
      'remove-success-title': string;
      'remove-success-description': string;
      'remove-error-title': string;
      'remove-error-description': string;
      'remove-button-aria': string;
      'remove-button': string;
      'add-button-aria': string;
      'dialog-title': string;
      'dialog-description': string;
      'select-placeholder': string;
      'submit-button': string;
    };
    'update-projects-related-collaborator': {
      'success-title': string;
      'success-description': string;
      'error-title': string;
      'error-description': string;
      'remove-success-title': string;
      'remove-success-description': string;
      'remove-error-title': string;
      'remove-error-description': string;
      'remove-button-aria': string;
      'remove-button': string;
      'add-button-aria': string;
      'dialog-title': string;
      'dialog-description': string;
      'select-placeholder': string;
      'submit-button': string;
    };
    'create-stack-form': {
      'key': string;
      'key-placeholder': string;
      'key-aria': string;
      'name': string;
      'name-placeholder': string;
      'name-aria': string;
      'description': string;
      'description-placeholder': string;
      'description-aria': string;
      'category': string;
      'category-placeholder': string;
      'type': string;
      'type-placeholder': string;
      'icon-url': string;
      'icon-url-placeholder': string;
      'icon-url-aria': string;
      'submit': string;
      'submit-aria': string;
      'success-title': string;
      'success-description': string;
      'error-title': string;
      'error-description': string;
    };
    'create-project-form': {
      'key': string;
      'key-placeholder': string;
      'key-aria': string;
      'name': string;
      'name-placeholder': string;
      'name-aria': string;
      'status': string;
      'status-placeholder': string;
      'stack': string;
      'stack-placeholder': string;
      'start-date': string;
      'start-date-aria': string;
      'select-start-date': string;
      'end-date': string;
      'end-date-aria': string;
      'select-end-date': string;
      'description': string;
      'description-placeholder': string;
      'description-aria': string;
      'goals': string;
      'goals-placeholder': string;
      'goals-aria': string;
      'contributions': string;
      'contributions-placeholder': string;
      'contributions-aria': string;
      'logo-url': string;
      'logo-url-placeholder': string;
      'logo-url-aria': string;
      'primary-color': string;
      'primary-color-placeholder': string;
      'primary-color-aria': string;
      'demo-url': string;
      'demo-url-placeholder': string;
      'demo-url-aria': string;
      'github-url': string;
      'github-url-placeholder': string;
      'github-url-aria': string;
      'submit': string;
      'submit-aria': string;
      'success-title': string;
      'success-description': string;
      'error-title': string;
      'error-description': string;
    };
    'data-table-column-header': {
      sort: {
        asc: string;
        desc: string;
        none: string;
      };
      visibility: {
        hide: string;
      };
    };
    'data-table': {
      'no-data': string;
      'selected-rows': string;
      'rows-per-page': string;
      'page-info': string;
      'first-page': string;
      'previous-page': string;
      'next-page': string;
      'last-page': string;
    };
    'stack-drawer': {
      'description': string;
      'related-projects': string;
    };
    'create-collaborator-form': {
      'nickname': string;
      'github-username': string;
      'linkedin-username': string;
      'submit': string;
      'success-title': string;
      'success-description': string;
      'error-title': string;
      'error-description': string;
    };
    'show-collaborator-form': {
      'nickname': string;
      'github-username': string;
      'linkedin-username': string;
      'edit': string;
    };
    'update-collaborator-form': {
      'nickname': string;
      'github-username': string;
      'linkedin-username': string;
      'submit': string;
      'success-title': string;
      'success-description': string;
      'error-title': string;
      'error-description': string;
    };
    'stack-table-header': {
      'success-title': string;
      'success-description': string;
      'error-title': string;
      'error-description': string;
      'search-placeholder': string;
      'create': string;
      'view-details': string;
      'edit': string;
      'delete': string;
      'confirm-title': string;
      'confirm-description': string;
      'cancel': string;
    };
  };
  // 'services': {
  //   test: {
  //     bla: string;
  //   };
  // };
  // 'http-response': {
  //   response: {
  //     'not-found': string;
  //   };
  // };
  error: {
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
