import { Component } from '@angular/core';
import { PimaticService } from './../../projects/ng-pimatic/src/lib/pimatic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private pimatic: PimaticService) {
    pimatic.getDevices().subscribe(d => {
      console.log(d);
    });
  }
}
