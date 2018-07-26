import { PimaticService } from "./pimatic.service";
import { PimaticIo } from "./pimatic.io";
import { PimaticAuthenticationInterceptor } from "./pimatic-authentication-interceptor";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { Config, PIMATIC_CONFIG } from "./config";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SocketIoModule } from "ngx-socket-io";

export function pimaticIoFactory(pimatic: PimaticService) {
  return new PimaticIo(pimatic.config);
}

@NgModule({
  imports: [HttpClientModule, SocketIoModule],
  declarations: [],
  exports: [],
  providers: [
    {
      provide: PimaticIo,
      useFactory: pimaticIoFactory,
      deps: [PimaticService]
    }
  ]
})
export class PimaticModule {
  static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: PimaticModule,
      providers: [
        { provide: PIMATIC_CONFIG, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: PimaticAuthenticationInterceptor,
          multi: true
        }
      ]
    };
  }
}
