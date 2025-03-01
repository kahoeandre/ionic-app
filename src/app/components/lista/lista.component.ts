import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.services';
import { IonList, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Input } from '@angular/core';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonAvatar, IonLabel, CommonModule,],
})
export class ListaComponent implements OnInit {
  @Input() searchTerm: string = '';
  public produtos: any[] = [];
  public produtosFiltrados: any[] = [];

  constructor(
    public produtoService: ProdutoService,
    private router: Router,
  ) { }

  async ngOnInit() {
    if (this.produtoService.produtos.length === 0) {
      this.produtoService.listarProdutos().subscribe({
        next: (produtos) => {
          console.log('Produtos carregados:', produtos);
          this.produtosFiltrados = produtos;
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

  ngOnChanges() {
    this.filtrarProdutos();
  }

  filtrarProdutos() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.produtoService.produtos = this.produtoService.produtosOriginal.filter((produto) =>
        produto.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    } else {
      this.produtoService.produtos = [...this.produtoService.produtosOriginal];
    }
    console.log('teste', this.produtoService.produtos)
  }

  async carregarProdutos() {
    try {
      this.produtos = await this.produtoService.listarProdutos().toPromise();
      console.log('pord', this.produtos)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  }

  abrirDetalhesProdutos(id: number) {
    this.router.navigate(['/produto', id])
  }
}