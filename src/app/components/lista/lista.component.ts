import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.services';
import { IonContent,IonList,IonItem,IonAvatar,IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  standalone: true,
  imports: [IonContent,IonList,IonItem,IonAvatar,IonLabel, CommonModule,],
})
export class ListaComponent  implements OnInit{

  constructor(
    public produtoService: ProdutoService,
    private router: Router
  ) { }

   // armazena os produtos
 public produtos: any[] = [];

  async ngOnInit() {
    if (this.produtoService.produtos.length === 0) {
      this.produtoService.listarProdutos().subscribe({
        next: (produtos) => {
          console.log('Produtos carregados:', produtos);
        },
        error: (erro) => {
          console.error('Erro ao carregar produtos:', erro);
        }
      });
    }
  }

  mostrarProdutos() {
    console.log('Mostrando produtos:', this.produtos);
  }
  
  // função para listar todos os produtos
  async carregarProdutos() {
    try {
      this.produtos = await this.produtoService.listarProdutos().toPromise();
      console.log('pord',this.produtos)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  // navega para a pagina de detalhes do produto com o id
  abrirDetalhesProdutos(id: number){
    this.router.navigate(['/produto', id])
  }
}


