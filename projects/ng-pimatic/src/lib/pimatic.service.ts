import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root'
})
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
    return this.http
      .get<{ config: IConfig }>(
        `${this.pimaticUrl}/config?password=${password}`
      )
      .pipe(map(res => res.config));
  }

  updateConfig(config) {
    return this.http.post(`${this.pimaticUrl}/config`, config);
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
    return this.http
      .get<{ rules: IRule[] }>(`${this.pimaticUrl}/rules`)
      .pipe(map(res => res.rules));
  }

  getRuleById(ruleId: string) {
    return this.http.get<IRule>(`${this.pimaticUrl}/rules/${ruleId}`);
  }

  getRuleActionsHints(actionsInput: string) {
    return this.http
      .post<{ actionHints: IActionHints }>(
        `${this.pimaticUrl}/rules-parser/get-action-hints`,
        {
          actionsInput
        }
      )
      .pipe(map(res => res.actionHints));
  }

  getRuleConditionHints(conditionInput: string) {
    return this.http
      .post<{ conditionHints: IConditionHints }>(
        `${this.pimaticUrl}/rules-parser/get-condition-hints`,
        {
          conditionInput
        }
      )
      .pipe(map(res => res.conditionHints));
  }

  getPredicatePresets() {
    return this.http
      .get<{ presets: IPreset[] }>(
        `${this.pimaticUrl}/rules-parser/get-predicate-presets`
      )
      .pipe(map(res => res.presets));
  }

  getPredicateInfo(input: string, predicateProviderClass?: string) {
    // tslint:disable-next-line:max-line-length
    return this.http
      .get<{ predicates: IPredicate[] }>(
        `${
          this.pimaticUrl
        }/rules-parser/get-predicate-info?input=${input}&predicateProviderClass=${predicateProviderClass}`
      )
      .pipe(map(res => res.predicates));
  }

  executeAction(actionString: string, simulate?: boolean, logging?: string) {
    return this.http
      .post<{ message: string }>(`${this.pimaticUrl}/execute-action`, {
        actionString,
        simulate,
        logging
      })
      .pipe(map(res => res.message));
  }

  updateRuleOrder(ruleOrder: IRule[]) {
    return this.http
      .post<{ rules: IRule[] }>(`${this.pimaticUrl}/rules`, {
        ruleOrder
      })
      .pipe(map(res => res.rules));
  }

  /**
   * Variables
   */
  getVariables() {
    return this.http
      .get<{ variables: IVariable[] }>(`${this.pimaticUrl}/variables`)
      .pipe(map(res => res.variables));
  }

  updateVariable(
    name: string,
    type: string,
    valueOrExpression: string,
    unit?: string
  ) {
    return this.http
      .patch<{ variable: IVariable }>(`${this.pimaticUrl}/variables/${name}`, {
        name,
        type,
        valueOrExpression,
        unit
      })
      .pipe(map(res => res.variable));
  }

  addVariable(
    name: string,
    type: string,
    valueOrExpression: string,
    unit?: string
  ) {
    return this.http
      .post<{ variable: IVariable }>(`${this.pimaticUrl}/variables/${name}`, {
        name,
        type,
        valueOrExpression,
        unit
      })
      .pipe(map(res => res.variable));
  }

  getVariableByName(name: string) {
    return this.http
      .get<{ variable: IVariable }>(`${this.pimaticUrl}/variables/${name}`)
      .pipe(map(res => res.variable));
  }
  // TODO: more variable functions

  /**
   * Devices
   */
  getDevices() {
    return this.http
      .get<{ devices: IDevice[] }>(`${this.pimaticUrl}/devices`)
      .pipe(map(res => res.devices));
  }
  // TODO: more device functions
  callDeviceAction(deviceId: string, actionName: string) {
    return this.http.get<void>(
      `${this.pimaticUrl}/device/${deviceId}/${actionName}`
    );
  }

  // TODO: group functions
  /**
   * Groups
   */

  // TODO: page functions
  /**
   * Pages
   */
  getPages() {
    return this.http
      .get<{ pages: any[] }>(`${this.pimaticUrl}/pages`)
      .pipe(map(res => res.pages));
  }

  /**
   * Plugins
   */
  getInstalledPluginsWithInfo() {
    return this.http
      .get<{ plugins: IPlugin[] }>(`${this.pimaticUrl}/plugins`)
      .pipe(map(res => res.plugins));
  }

  /**
   * Messages
   */
  queryMessages(criteria: IMessageCriteria) {
    const params = new HttpParams({
      fromObject: criteria as any
    });
    return this.http
      .get<{ messages: IMessage[] }>(`${this.pimaticUrl}/database/messages`, {
        params: params
      })
      .pipe(map(res => res.messages));
  }
}
