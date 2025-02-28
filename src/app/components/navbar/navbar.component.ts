import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonFooter,IonToolbar,IonButtons,IonButton,IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonFooter,IonToolbar,IonButtons,IonButton,IonIcon, CommonModule, RouterLink],
})
export class NavbarComponent  implements OnInit {

  constructor(private navCtrl: NavController) { }

  navigateTo(page: string){
    this.navCtrl.navigateForward(`/${page}`);
  }

  ngOnInit() {}

}
