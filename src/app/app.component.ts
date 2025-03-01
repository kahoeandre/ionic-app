import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, RouterModule],
})
export class AppComponent {
  constructor( private platform: Platform) {

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      document.body.classList.remove('dark'); 
    });
  }
}
