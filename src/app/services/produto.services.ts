import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = 'https://fakestoreapi.com/products';
  public produtos: any[] = [];
  public produtosOriginal: any[] = [];

  constructor(private http: HttpClient) { }

  // Cadastrar um novo produto
  cadastrarProduto(produto: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(this.apiUrl, JSON.stringify(produto), { headers: headers })
    .pipe(
      tap((response) => {
        console.log('Produto cadastrado com sucesso:', response);
      })
    );
  }

  // Listar todos os produtos
  listarProdutos(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap((data: any) => {
        this.produtos = data; 
        this.produtosOriginal = [...data]; 
      })
    );
  }

  // Pesquisar produtos por categoria
  filtrarPorCategoria(categoria: string) {
    if (categoria === 'all') {
      this.produtos = [...this.produtosOriginal];
    } else {
      this.produtos = this.produtosOriginal.filter(
        (produto) => produto.category === categoria
      );
    }
  }

  // atualiza um produto 
  editarItem(id: number, produto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, produto).pipe(
      tap((produtoAtualizado) => {
        const index = this.produtos.findIndex(p => p.id === id);
        if (index !== -1) {
          this.produtos[index] = produtoAtualizado; 
        }
      })
    )
  }

  // Deleta um produto
  deletarItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}