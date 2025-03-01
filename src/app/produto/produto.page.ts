import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonFooter, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonImg, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular'
import { ProdutoService } from '../services/produto.services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
  standalone: true,
  imports: [IonFooter, FormsModule, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonContent, IonImg, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, CommonModule]
})
export class ProdutoPage implements OnInit {
  produto: any;
  edicao: boolean = false;
  produtoId: number | null = null;

  constructor(
    private navController: NavController,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  voltar() {
    this.navController.back();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.edicao = true;
      this.produtoId = +id;
      this.carregarProduto(this.produtoId);
    }
  }

  carregarProduto(id: number) {
    const produtoEncontrado = this.produtoService.produtos.find(p => p.id === id);
    if (produtoEncontrado) {
      this.produto = produtoEncontrado;
    } else {
      console.error('gerou erro no teste')
    }
  }

  removerItem(id: number) {
    const index = this.produtoService.produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.produtoService.produtos.splice(index, 1);
      console.log('Produto removido')
      this.voltar()
    } else {
      console.error('Erro para apagar')
    }
  }

  editarItem() {
    const id = this.produto.id;
    this.router.navigate(['/cadastro', id]);
  }
}

