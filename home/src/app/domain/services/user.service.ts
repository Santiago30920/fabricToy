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

  constructor(private http: HttpClient, private utilitiesService: UtilitiesService) { }

  persistir(user: User){
    let payload: any;
    payload = {
      name: user.name,
      lastName: user.lastName,
      mail: user.mail,
      typeDocument: user.typeDocument,
      numberDocument: user.numberDocument,
      password: user.password,
      state: 1,
      rol: 3
    }
    return this.http.post<User>(
      ESystem.URL_TEMP + EUser.CREATE_USER , payload)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  editar(user: User) {
    let payload: any;
    payload = {
      name: user.name,
      lastName: user.lastName,
      mail: user.mail,
      typeDocument: user.typeDocument,
      numberDocuement: user.numberDocument,
      state: user.state,
      rol: user.rol
    }
    return this.http.patch<User>(
      ESystem.URL_TEMP + EUser.UPDATE_USER + user.numberDocument , payload)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  listar() {
    return this.http.get<User>(
      ESystem.URL_TEMP + EUser.SEARCH_USER)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  login(user: User){
    let payload: any;
    payload = {
      mail: user.mail,
      password: user.password,
    }
    return this.http.post<string>(
      ESystem.URL_TEMP + EUser.LOGIN, payload)
    .pipe(catchError(this.utilitiesService.handleError));
  }

  updateUser(user: User){
    let payload: any;
    payload = {
      mail: user.mail,
      password: user.password,
    }
    return this.http.post<User>(
      ESystem.URL_TEMP + EUser.UPDATE_PASSWORD + user.numberDocument, payload)
    .pipe(catchError(this.utilitiesService.handleError));
  }
}
