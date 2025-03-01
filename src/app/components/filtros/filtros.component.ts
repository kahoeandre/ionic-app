import { Component, OnInit } from '@angular/core';
import { IonButton, IonIcon, IonModal, IonPopover, IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.services';


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonModal, IonPopover, IonContent, IonList, IonItem, CommonModule],
})

export class FiltrosComponent implements OnInit {
  public produtosFiltrados: any[] = [];

  constructor(
    private produtoService: ProdutoService,
  ) { }

  ngOnInit(
  ) { }

  async filtrarPorPreco(preco: string) {
    if (preco === 'menor') {
      this.produtoService.produtos.sort(
        (a, b) => a.price - b.price
      );
    } else if (preco === 'maior') {
      this.produtoService.produtos.sort(
        (a, b) => b.price - a.price
      );
    } else if (preco = 'all') {
      this.produtoService.produtos = [...this.produtoService.produtosOriginal];
    }
  }

  filtrarPorCategoria(categoria: string) {
    this.produtoService.filtrarPorCategoria(categoria);
  }
}
