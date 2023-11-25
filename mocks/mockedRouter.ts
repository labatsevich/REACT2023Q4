import { NextRouter } from "next/router";
import { vi } from "vitest";

export function mockedRouter(router: Partial<NextRouter>):NextRouter {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    back: vi.fn(),
    forward: vi.fn(),
    beforePopState: vi.fn(),
    prefetch: vi.fn(),
    push: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    locales: [],
    locale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router,

  };
}