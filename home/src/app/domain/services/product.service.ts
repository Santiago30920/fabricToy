import { Injectable } from '@angular/core';
import { IGeneric } from './i-generic';
import { HttpClient } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';
import { catchError } from 'rxjs';
import { ESystem } from '../enums/e-system';
import { Product } from '../class/product';
import { EProduct } from '../enums/e-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements IGeneric{

  constructor(private http:HttpClient, private utilitiesService: UtilitiesService) { }

  persistir(product: Product){
    let payload = {
      name: product.name,
      quantity: product.quantity, 
      price:product.price, 
      state: product.state, 
      img1: product.img[0], 
      img2: product.img[1], 
      img3: product.img[2], 
      pdf: product.pdf, 
      description: product.pdf
    }
    return this.http.post<Product>(
      ESystem.URL_TEMP + EProduct.CREATE_PRODUCT , payload)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  editar(product: Product) {
    let payload = {
      name: product.name,
      quantity: product.quantity, 
      price:product.price, 
      state: product.state, 
      img1: product.img[0], 
      img2: product.img[1], 
      img3: product.img[2], 
      pdf: product.pdf, 
      description: product.description
    }
    return this.http.patch<Product>(
      ESystem.URL_TEMP + EProduct.UPDATE_PRODUCT + product.id, payload)
    .pipe(catchError(this.utilitiesService.handleError));
  }
  
  editarQuantityProduct(quantity: number, product: Product) {
    console.log(quantity)
    let payload: any = {
      quantity: Number(quantity)
    }
    return this.http.post<Product>(
      'http://127.0.0.1:8000/api/product/updateQua/' + product.id, Number(quantity))
    .pipe(catchError(this.utilitiesService.handleError));
  }

  listar() {
    return this.http.get<Product>(
      ESystem.URL_TEMP + EProduct.SEARCH_PRODUCT)
    .pipe(catchError(this.utilitiesService.handleError));
  }

}
