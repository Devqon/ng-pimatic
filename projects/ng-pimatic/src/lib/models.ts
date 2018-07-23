export interface IResponse {
  success: boolean;
}

export interface IConfig {

}
export interface IRule {

}
export interface IHints {
  tokens: any[];
  autocomplete: any[];
  errors: any[];
  warnings: any[];
  format: any[];
}
export interface IActionHints extends IHints {
  actions: any[];
}
export interface IConditionHints extends IHints {
  predicates: any[];
}
export interface IPreset {

}
export interface IPredicate {

}
export interface IVariable {

}
export interface IDevice {
  id: string;
  name: string;
  template?: string;
  attributes: IAttribute[];
  actions: IDeviceAction[];
  config: IDeviceConfig;
  configDefaults: IDeviceConfig;
}
export interface IAttribute {

}
export interface IDeviceAction {

}
export interface IDeviceConfig {

}
export interface IPlugin {

}
export interface IMessageCriteria {
  level?: any;
  levelOp?: string;
  after?: Date;
  before?: Date;
  limit?: number;
}
export interface IMessage {

}