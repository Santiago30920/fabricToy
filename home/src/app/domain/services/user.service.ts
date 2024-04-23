import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from './utilities.service';
import { IGeneric } from './i-generic';
import { User } from '../class/user';
import { EUser } from '../enums/e-user';
import { ESystem } from '../enums/e-system';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IGeneric{

  constructor(private http:HttpClient, private utilitiesService: UtilitiesService) { }

  persistir(user: User){
    return this.http.post<User>(
      ESystem.URL_TEMP + EUser.CREATE_USER , user)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  editar(user: User) {
    return this.http.patch<User>(
      ESystem.URL_TEMP + EUser.UPDATE_USER + user.numberDocument , user)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  listar() {
    return this.http.get<User>(
      ESystem.URL_TEMP + EUser.SEARCH_USER)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  login(){
    return this.http.get<User>(
      ESystem.URL_TEMP + EUser.LOGIN)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  updateUser(user: User){
    return this.http.get<User>(
      ESystem.URL_TEMP + EUser.UPDATE_PASSWORD + user.numberDocument)
    .pipe(catchError(this.utilitiesService.handleError));
  }
}
