import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  let token = localStorage.getItem('token');
  if(token){
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {       
          console.error('HTTP error 401 Unauthorized:', err);
          router.navigate(['/login']);
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }  

      return throwError(() => err); 
    })
  )
};
