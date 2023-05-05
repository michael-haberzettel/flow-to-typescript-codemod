import { App } from "../flow-libs/declarations/App";
import undescore from "underscore";
import moment from "moment";
import normalizr from "normalizr";
import JQuery from "jquery";
import d3 from "@types/d3";

declare global {
  interface Window {
    $: JQueryStatic;
    Backbone: any;
  }

  interface JQueryStatic {
    client?: {
      browser: string;
      os: string;
    };

    SafeDeferred: any;
    (...args: any[]): void;
  }

  interface JQuery {
    highlight(...args: any[]): void;
    highlightBoolean(...args: any[]): void;
  }

  var d3: d3;
  var dispatcher: { dispatchLifecycle: (ns: string) => void };
  var moment: moment;
  var Normalizr: normalizr;
  var Intercom: any;
  var toastr: any;
  var __webpack_public_path__: string;
  var App: App;
  var _: typeof undescore;
  var analytics: any;
  var Translation: any;
  var trans: any;
  var transDesc: any;
  var ___trans_desc___: any;
  interface Window {
    App: App;
    _: typeof undescore;
    analytics: any;
    Translator: any;
    Translation: any;
    trans: any;
    transDesc: any;
    ___trans_desc___: any;
  }
  type Environment = any;
  type FragmentReference = any;
}
export {};
