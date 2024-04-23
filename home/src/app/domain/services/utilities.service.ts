import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

    /**
* Operación para manejar los errores
* @param error identificado a gestionar
* @returns 
*/
public handleError(error: HttpErrorResponse) {
  let errorMessage = 'Unknown error!';
  if (error.error instanceof ErrorEvent) {
    // Client-side errors
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Server-side errors
    if (error) {
      errorMessage = JSON.stringify(error);
    }
  }
  return throwError(errorMessage);
}
}
