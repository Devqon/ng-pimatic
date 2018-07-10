import { PimaticService } from './pimatic.service';
import { PimaticAuthenticationInterceptor } from './pimatic-authentication-interceptor';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Config, PIMATIC_CONFIG } from './config';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
  exports: [
  ],
  providers: [PimaticService]
})
export class PimaticModule {
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: PimaticModule,
      providers: [
        {provide: PIMATIC_CONFIG, useValue: config},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: PimaticAuthenticationInterceptor,
          multi: true
        }
      ]
    };
  }
}
