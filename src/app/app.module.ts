import { PimaticModule } from './../../projects/ng-pimatic/src/lib/pimatic.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PimaticModule.forRoot({
      url: environment.pimaticUrl,
      user: environment.pimaticUser,
      password: environment.pimaticPassword
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
