import { Component, EventEmitter, Output } from '@angular/core';
import { IonSearchbar,IonHeader,IonToolbar,IonContent,IonFooter } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ListaComponent } from '../components/lista/lista.component';
import { FiltrosComponent } from '../components/filtros/filtros.component';
import { CarrosselComponent } from '../components/carrossel/carrossel.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ FormsModule,CarrosselComponent,IonSearchbar,IonHeader,IonToolbar,IonContent,IonFooter,CommonModule, NavbarComponent,ListaComponent, FiltrosComponent,IonSearchbar],
})
export class HomePage {
  headerHidden = false;

  termoPesquisa: string = '';

  onSearch(event: any) {
    this.termoPesquisa = event.target.value.toLowerCase();
    console.log(this.termoPesquisa)
  }

  constructor() {}
}
