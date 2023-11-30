import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject,
  catchError,
  pipe,
  tap,
  throwError,
} from 'rxjs';
import { apiUrl } from '../config';

@Injectable({
  providedIn: 'root',
})
export class AppServicesService {
  errorToastMessage = new Subject();
  profilePicture = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  registerApi(credentials: any) {
    return this.http
      .post(`${apiUrl}api/v1/users/registeration`, credentials)
      .pipe(
        catchError((err: any) => {
          let errorMessage = err.error.message;
          return throwError(errorMessage);
        })
      );
  }

  verifyOtpApi(otp: any, baseUrl: any) {
    return this.http.post(`${apiUrl}${baseUrl}`, otp).pipe(
      catchError((err: any) => {
        let errorMessage = err.error.message;
        return throwError(errorMessage);
      })
    );
  }

  loginApi(credentials: any) {
    return this.http.post(`${apiUrl}api/v1/users/login`, credentials).pipe(
      catchError((err: any) => {
        let errorMessage = err.error.message;
        return throwError(errorMessage);
      }),
      tap((resData: any) => {
        if (resData.success) {
          const { token } = resData.data;

          localStorage.setItem('token', token);
        }
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
          this.profilePicture.next(resData.data.profile_picture);
        })
      );
  }

  forgotPasswordApi(payload: any) {
    return this.http
      .post(`${apiUrl}api/v1/users/forgot-password`, payload)
      .pipe(
        catchError((err: any) => {
          let errorMessage = err.error.message;
          return throwError(errorMessage);
        })
      );
  }
}
