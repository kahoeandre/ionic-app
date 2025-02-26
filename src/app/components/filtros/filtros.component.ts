import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto.services';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  imports: [IonicModule,CommonModule],
})
export class FiltrosComponent  implements OnInit {
public produtosFiltrados: any[] = [];

  constructor(
    private produtoService: ProdutoService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit(
  ) {}

  async filtrarPorPreco(preco: string) {
    if (preco === 'menor') {
      this.produtoService.produtos.sort(
        (a, b) => a.price - b.price
      );
    } else if (preco === 'maior') {
      this.produtoService.produtos.sort(
        (a, b) => b.price - a.price
      );
    } else if(preco = 'all'){
      this.produtoService.produtos = [...this.produtoService.produtosOriginal];
    }
  }

  filtrarPorCategoria(categoria: string) {
    this.produtoService.filtrarPorCategoria(categoria);
  }
}
