declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "@chargebee/chargebee-js-react-wrapper" {
  export type ChargeBeeErrorsStateEntry = {
    errorCode: string;
    message: string;
  };
  export type ChargeBeeStatusChanged = {
    empty: boolean;
    field: string;
    error?: ChargeBeeErrorsStateEntry;
  };
  export type Props = {
    currency?: string;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: (status: ChargeBeeStatusChanged) => void;
    locale?: string;
    styles?: any;
    ref?: any;
  };

  export type CardComponentApiRef = {
    authorizeWith3ds(payementIntent: any, additionalInfos: any): Promise<any>;
    tokenize(additionalInfos: any): Promise<any>;
    focus(): void;
    clear(): void;
  };

  export class CardComponent extends React.Component<Props> {}
}
declare module "@lexical/*";
declare module "browser-filesaver";
declare module "copy-to-clipboard";
declare module "draft-js-emoji-mart-plugin";
declare module "draft-js-mention-plugin";
declare module "draft-js-plugins-editor";
declare module "emoji-mart";
declare module "find-with-regex";
declare module "mention/integrations/*";
declare module "mention/legacy/*";
declare module "mention/vendor/*";
declare module "moment-timezone";
declare module "react-ace" {
  export type Annotation = any;
  export type Command = any;
  export type Editor = any;

  var exportLib: any;
  export default exportLib;
}
declare module "react-date-picker" {
  var exportLib: any;
  export default exportLib;
}
declare module "react-select2-wrapper";
declare module "react-visibility-sensor";
declare module "userflow.js";
