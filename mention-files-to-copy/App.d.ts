declare module "mention-global-module" {
  import type { Store } from "redux";

  export class AppInterface {
    account: any; // FIXME model to be refined
    client: any;
    data: any;
    global: any;
    headless: any;
    helper: {
      Alert: {
        new (...args: any): any;
      };
      Share: {
        new (...args: any): any;
      };
    };
    initConf: AppConf;
    mention_default_picture: string;
    router: Router;
    trackers: AppTracker;
    onboarding: any;
    socket: AppSocket;
    socialShareManager: any;
    store: Store<any, any>;
    subscriber: any;
    templates: {
      fetch: () => Promise<any>;
      render: (b: string, a: any) => string;
      templatesJson: {
        [x: string]: string;
      };
    };
    version: number;
    init(a: AppConf): void;
    run(): void;
    setup(token?: string): Promise<any>;
    getPref(key: string, def?: any): any;
    internalSetPref(key: string, value: any): void;
    setPref(key: string, value: any): void;
    setLocalStoragePref(key: string, value: any): void;
    unsetPref(key: string): void;
    setSelectedGroup(graphQLId: string, RestID: string): void;
    getLocalStorageGroupId(key: string, def?: any): string;
    setLocalStorageSelectedGroup(graphQLId: string, RestID: string): void;
    removeToken(): void;
    removeSelectedGroupInfo(): void;
    isMobileFeedSelected(): boolean;
  }

  export type AppConf = {
    asset_prefix: string;
    assets_version: string;
    clientData: {
      api_endpoint: string;
      language: string;
    };
    default_avatar: string;
    default_api_domain: string;
    default_currency: any;
    default_group_image: string;
    default_mention_avatar: string;
    domain: string;
    hub_url: string;
    is_mobile_device: boolean;
    language: string;
    last_seen_delay: string;
    lnk: string;
    locale_data: {
      grouping_separator: string;
      decimal_separator: string;
      date_locale: string;
    };
    oauth_redirect_uri: string;
    oauth_response_type: string;
    prefetch: any;
    token: string;
  };

  export class AppSocket {
    socket: {
      killWs: () => void;
    };

    init(a: {
      accountId: string;
      nodeUrl: string;
      goUrl: string;
      forcedGohubUsers: string[];
      gohubCoverageDenominator: number;
    }): void;

    emit(b: string, a: any): void;
    isPreferredDisabled(): boolean;
    off(a: string): void;
    on(a: string, cb: (a: any) => void): void;
    preferDisabled(a: boolean): void;
  }

  export interface AppTracker {
    /**
     * Send the anonymous user UID to `segment/forward/identify`
     */
    identify(id: string, props?: any): void;
    /**
     * Send the Page navigation event
     */
    page(page: string, data?: any): void;
    /**
     * Toggle the tracking of events on/off
     */
    toggleTracking(onOff: boolean): void;
    /**
     * Toggle the log of events on/off
     */
    toggleLog(onOff: boolean): void;
    /**
     * Send a tracking event
     * @property {string} name Event in current language
     */
    track(name: string, data?: any, props?: any): void;
    /**
     * Regenerate another anonymous Id for the non logged User
     */
    resetAnonymousId(): void;
  }

  export class Router {
    history: string[];
    loginRedirect: string | undefined | null;
    mode: RouterMode;
    previousRoute: string;
    routes: RouterRoutes;
    assemble(routeName: string, routeOpts?: RouterRouteOpts): RouterRoute;
    assembleHref(routeName: string, routeOpts?: RouterRouteOpts): RouterRoute;

    bindRoutes(a: { [x: string]: string }): void;

    current(): {
      fragment: string;
    };

    decorate(a: any): void;
    dispatch(viewGroup: string, view?: string | null, opts?: any): void;
    getAnonymousPagePath(): string;
    getHash(): string;
    go(
      route: RouterRoute,
      routeOpts?: RouterRouteOpts,
      opts?: RouterNavigateOpts
    ): void;
    goToPreviousUrl(): void;

    navigate(
      route: RouterRoute,
      opts?: RouterNavigateOpts | boolean,
      reallyForce?: boolean
    ): void;

    refresh(): void;
    setMode(a: string, loadUrl?: boolean): void;
    subscribe: any;
    suspend(): void;
    unsuspend(): void;
  }

  export type RouterMode = "app" | "headless" | "login" | "outOfApp";

  export type RouterRoutes = {
    [k in RouterMode]: {
      [x: string]: string;
    };
  };

  export type RouterRoute = string;

  export type RouterRouteOpts = {
    readonly [x: string]: string | number | boolean | undefined | null;
  };

  export type RouterNavigateOpts = {
    reallyForce?: boolean;
    trigger?: boolean;
    replace?: boolean;
  };
}
