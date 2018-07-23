import { Observable } from 'rxjs/Observable';
import { PIMATIC_CONFIG, Config } from './config';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IActionHints,
  IConditionHints,
  IConfig,
  IDevice,
  IMessage,
  IMessageCriteria,
  IPlugin,
  IPredicate,
  IPreset,
  IRule,
  IVariable
} from './models';

@Injectable()
export class PimaticService {
  private pimaticUrl = 'http://demo.pimatic.org/api';

  config: Config;

  constructor(
    @Inject(PIMATIC_CONFIG) config: Config,
    private http: HttpClient
  ) {
    this.updateApiConfig(config);
  }

  updateApiConfig(config: Config) {
    if (!this.config) {
      this.config = config;
    } else {
      Object.assign(this.config, config);
    }
    this.pimaticUrl = `${this.config.url}/api`;
  }

  // falback for non-implemented functions
  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.pimaticUrl}/${endpoint}`);
  }
  post<T>(endpoint: string, data) {
    return this.http.post<T>(`${this.pimaticUrl}/${endpoint}`, data);
  }
  put<T>(endpoint: string, data) {
    return this.http.put<T>(`${this.pimaticUrl}/${endpoint}`, data);
  }
  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.pimaticUrl}/${endpoint}`);
  }

  restart() {
    return this.http.post<any>(`${this.pimaticUrl}/restart`, null);
  }

  /**
   * Config
   */
  getConfig(password?: string) {
    return this.http.get<IConfig>(`${this.pimaticUrl}/config?password=${password}`);
  }

  updateConfig(config) {
    return this.http.post<void>(`${this.pimaticUrl}/config`, config);
  }

  /**
   * Rules
   */
  addRuleByString(ruleId: string, rule: object, force?: boolean) {
    return this.http.post<void>(`${this.pimaticUrl}/rules/${ruleId}`, {
      ruleId: ruleId,
      rule: rule,
      force: force
    });
  }

  updateRuleByString(ruleId: string, rule: object) {
    return this.http.patch<void>(`${this.pimaticUrl}/rules/${ruleId}`, {
      ruleId: ruleId,
      rule: rule
    });
  }

  removeRule(ruleId: string) {
    return this.http.delete<void>(`${this.pimaticUrl}/rules/${ruleId}`);
  }

  getRules() {
    return this.http.get<IRule[]>(`${this.pimaticUrl}/rules`);
  }

  getRuleById(ruleId: string) {
    return this.http.get<IRule>(`${this.pimaticUrl}/rules/${ruleId}`);
  }

  getRuleActionsHints(actionsInput: string) {
    return this.http.post<IActionHints>(`${this.pimaticUrl}/rules-parser/get-action-hints`, {
      actionsInput
    });
  }

  getRuleConditionHints(conditionInput: string) {
    return this.http.post<IConditionHints>(`${this.pimaticUrl}/rules-parser/get-condition-hints`, {
      conditionInput
    });
  }

  getPredicatePresets() {
    return this.http.get<IPreset[]>(`${this.pimaticUrl}/rules-parser/get-predicate-presets`);
  }

  getPredicateInfo(input: string, predicateProviderClass?: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<IPredicate[]>(`${this.pimaticUrl}/rules-parser/get-predicate-info?input=${input}&predicateProviderClass=${predicateProviderClass}`);
  }

  executeAction(actionString: string, simulate?: boolean, logging?: string) {
    return this.http.post<string>(`${this.pimaticUrl}/execute-action`, {
      actionString,
      simulate,
      logging
    });
  }

  updateRuleOrder(ruleOrder: IRule[]) {
    return this.http.post<IRule[]>(`${this.pimaticUrl}/rules`, {
      ruleOrder
    });
  }

  /**
   * Variables
   */
  getVariables() {
    return this.http.get<IVariable[]>(`${this.pimaticUrl}/variables`);
  }

  updateVariable(name: string, type: string, valueOrExpression: string, unit?: string) {
    return this.http.patch<IVariable>(`${this.pimaticUrl}/variables/${name}`, {
      name,
      type,
      valueOrExpression,
      unit
    });
  }

  addVariable(name: string, type: string, valueOrExpression: string, unit?: string) {
    return this.http.post<IVariable>(`${this.pimaticUrl}/variables/${name}`, {
      name,
      type,
      valueOrExpression,
      unit
    });
  }

  getVariableByName(name: string) {
    return this.http.get<IVariable>(`${this.pimaticUrl}/variables/${name}`);
  }
  // TODO: more variable functions

  /**
   * Devices
   */
  getDevices() {
    return this.http.get<IDevice[]>(`${this.pimaticUrl}/devices`);
  }
  // TODO: more device functions
  callDeviceAction(deviceId: string, actionName: string) {
    return this.http.get<void>(`${this.pimaticUrl}/device/${deviceId}/${actionName}`);
  }

  // TODO: group functions
  /**
   * Groups
   */

  /**
   * Plugins
   */
  getInstalledPluginsWithInfo() {
    return this.http.get<IPlugin[]>(`${this.pimaticUrl}/plugins`);
  }

  /**
   * Messages
   */
  queryMessages(criteria: IMessageCriteria) {
    const params = new HttpParams({
      fromObject: criteria as any
    });
    return this.http.get<IMessage>(`${this.pimaticUrl}/database/messages`, {
      params: params
    });
  }
}
