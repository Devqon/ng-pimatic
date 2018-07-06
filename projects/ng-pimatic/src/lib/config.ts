import { InjectionToken } from '@angular/core';

export interface Config {
  url: string;
  user: string;
  password: string;
}

export const PIMATIC_CONFIG = new InjectionToken<Config>('PIMATIC_CONFIG');
