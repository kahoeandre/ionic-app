import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonCard, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ProdutoService } from '../services/produto.services';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, IonCard, IonList, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, FormsModule, CommonModule],
})
export class CadastroPage {

  id?: number;
  nome: string = '';
  preco: number | null = null;
  selectedCategory: string | undefined;
  descricao: string = '';
  image: string = '';

  edicao: boolean = false;
  produtoId: number | null = null;
  produto: any;

  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.edicao = true;
      this.produtoId = +id;
      this.carregarProdutoParaEdicao(this.produtoId);
    } else {
      this.edicao = false;
    }
  }

  carregarProdutoParaEdicao(id: number) {
    const produtoEncontrado = this.produtoService.produtos.find(p => p.id === id);
    if (produtoEncontrado) {
      this.nome = produtoEncontrado.title;
      this.preco = produtoEncontrado.price;
      this.selectedCategory = produtoEncontrado.category;
      this.descricao = produtoEncontrado.description;
      this.image = produtoEncontrado.image;
    } else {
      console.error('Produto não encontrado na lista local.');
    }
  }

  voltar() {
    this.navController.back();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione uma imagem!');
    }
  }

  async salvarProduto() {
    if (!this.nome || !this.preco || !this.selectedCategory || !this.descricao || !this.image) {
      const alert = await this.alertController.create({
        header: 'Atenção',
        message: 'Por favor, preencha todos os campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const produto = {
      title: this.nome,
      price: this.preco,
      description: this.descricao,
      image: this.image,
      category: this.selectedCategory,
    };

    try {
      if (this.edicao && this.produtoId) {
        await lastValueFrom(this.produtoService.editarItem(this.produtoId, produto));
        console.log('Produto atualizado:', produto);
      } else {
        const response = await lastValueFrom(this.produtoService.cadastrarProduto(produto));
        console.log('Produto cadastrado:', response);
        this.produtoService.produtos.push(response);
        this.produtoService.produtosOriginal.push(response);
      }
      const alert = await this.alertController.create({
        header: 'Sucesso!',
        message: this.edicao ? 'Produto atualizado com sucesso.' : 'Produto cadastrado com sucesso.',
        buttons: ['OK'],
      });
      await alert.present();

      this.router.navigate(['/home']);
      this.limparCampos();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Ocorreu um erro ao cadastrar o produto.',
        buttons: ['OK'],
      });
      await alert.present();
      console.error('Erro ao cadastrar produto:', error);
    }
  }

  limparCampos() {
    this.id = undefined;
    this.nome = '';
    this.preco = null;
    this.selectedCategory = undefined;
    this.descricao = '';
    this.image = '';
    this.edicao = false;
    this.produtoId = null;
  }
}