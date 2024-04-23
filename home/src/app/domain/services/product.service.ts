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
    return this.http.post<Product>(
      ESystem.URL_TEMP + EProduct.CREATE_PRODUCT , product)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  editar(product: Product) {
    return this.http.patch<Product>(
      ESystem.URL_TEMP + EProduct.UPDATE_PRODUCT + product.id, product)
    .pipe(catchError(this.utilitiesService.handleError));
  }
  
  editarQuantityProduct(product: Product) {
    return this.http.patch<Product>(
      ESystem.URL_TEMP + EProduct.UPDATE_QUANTITY_PRODUCT + product.id, product)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  listar() {
    return this.http.get<Product>(
      ESystem.URL_TEMP + EProduct.SEARCH_PRODUCT)
    .pipe(catchError(this.utilitiesService.handleError));
  }

}
