import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ListaComponent } from '../components/lista/lista.component';
import { FiltrosComponent } from '../components/filtros/filtros.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonicModule,RouterLink,CommonModule, NavbarComponent,ListaComponent, FiltrosComponent],
})
export class HomePage {
  constructor() {}
}
