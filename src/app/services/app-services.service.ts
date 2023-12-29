import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  map,
  pipe,
  tap,
  throwError,
} from 'rxjs';
import { apiUrl } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AppServicesService {
  errToastMessage = signal<any>('');
  isVisibleSpinner = new BehaviorSubject<boolean>(false);
  profilePicture = signal<any>('');

  constructor(private http: HttpClient) {}

  getAPI(baseUrl: string) {
    return this.http.get(`${apiUrl}${baseUrl}`).pipe(
      catchError((err: any) => {
        this.isVisibleSpinner.next(false);
        let errorMessage = err.error.message;
        return throwError(errorMessage);
      }),
      tap((resData: any) => {
        this.isVisibleSpinner.next(false);
      })
    );
  }

  postAPI(payload: any, baseUrl: string) {
    return this.http.post(`${apiUrl}${baseUrl}`, payload).pipe(
      catchError((err: any) => {
        let errorMessage = err.error.message;
        this.isVisibleSpinner.next(false);
        return throwError(errorMessage);
      }),
      tap((resDat: any) => {
        this.isVisibleSpinner.next(false);
      })
    );
  }

  patchAPI(payload: any, param: any, baseUrl: string) {
    return this.http.patch(`${apiUrl}${baseUrl}${param}`, payload).pipe(
      catchError((err: any) => {
        this.isVisibleSpinner.next(false);
        let errorMessage = err.error.message;
        return throwError(errorMessage);
      }),
      tap((resData: any) => {
        this.isVisibleSpinner.next(false);
      })
    );
  }

  logoutApi(token: any) {
    return this.http
      .post(`${apiUrl}api/v1/users/logout`, token, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        catchError((err: any) => {
          let errorMessage = err.error.message;
          return throwError(errorMessage);
        })
      );
  }

  getUserByToken(token: any) {
    return this.http
      .post(`${apiUrl}api/v1/users/profile`, token, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        catchError((err: any) => {
          let errorMessage = err.error.message;
          return throwError(errorMessage);
        }),
        tap((resData: any) => {
          this.profilePicture.set(resData.data.profile_picture.data);
        })
      );
  }
}
