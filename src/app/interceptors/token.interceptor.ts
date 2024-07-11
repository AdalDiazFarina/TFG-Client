import { inject } from '@angular/core';
import { HttpRequest, HttpInterceptorFn, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { sAuth } from '../services/sAuth.service';

export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const authService: any = inject(sAuth); 
  // Adding the token to the request
  if (accessToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  // Next action
  return next(request).pipe(
    // If we catch an error, we renew the token
    catchError(error => {
      console.log("Falle aqui", error)
      if (error.status === 401 && refreshToken) {
        return authService.$refreshToken().next(true);
      }
      return throwError(() => new Error(error));
    })
  ) as Observable<HttpEvent<any>>;
}
