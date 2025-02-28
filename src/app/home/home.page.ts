import { Component } from '@angular/core';
import { IonSearchbar,IonHeader,IonToolbar,IonContent,IonFooter } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ListaComponent } from '../components/lista/lista.component';
import { FiltrosComponent } from '../components/filtros/filtros.component';
import { CarrosselComponent } from '../components/carrossel/carrossel.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ CarrosselComponent,IonSearchbar,IonHeader,IonToolbar,IonContent,IonFooter,CommonModule, NavbarComponent,ListaComponent, FiltrosComponent,IonSearchbar],
})
export class HomePage {
  headerHidden = false;

  constructor() {}
}
