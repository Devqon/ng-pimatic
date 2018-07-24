import { Socket } from 'ngx-socket-io';
import { Config } from './config';
import { Injectable } from '@angular/core';
import { IRule, IVariable } from './models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PimaticIo extends Socket {
  constructor(config: Config) {
    super({
      url: `${config.url}/username=${config.user}&password=${config.password}`,
      options: {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 3000,
        timeout: 20000,
        forceNew: true
      }
    });
  }

  onDevices<T>() {
    return this.fromEvent<T>('devices');
  }

  onConnect() {
    return this.fromEvent('connect');
  }

  onDisconnect() {
    return this.fromEvent('disconnect');
  }

  onEvent(event: string) {
    return this.fromEvent<any>('event');
  }

  onRules() {
    return this.fromEvent<IRule[]>('rules');
  }

  onVariables() {
    return this.fromEvent<IVariable[]>('variables');
  }

  onPages() {
    return this.fromEvent<any[]>('pages');
  }

  onGroups() {
    return this.fromEvent<any[]>('groups');
  }

  onDeviceAttributeChanged() {
    return this.fromEvent<any>('deviceAttributeChanged');
  }
}
