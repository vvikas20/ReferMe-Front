import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ApiEndPoints } from 'src/referMe/configs/api-endpoints';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class AuthenticationService {

  constructor(private httpService: HttpService) { }

  validateUser(email: string, password: string): Observable<any> {

    const reqHeader: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    const params: HttpParams = new HttpParams().set('email', email).set('password', password);

    return this.httpService.Post<any>(ApiEndPoints.validateUser, {}, { headers: reqHeader, params: params }).pipe(map(data => {
      if (data.EmailAddress != '') {
        localStorage.setItem('jwtkey', JSON.stringify(data));
      }
      return data;
    }));

  }

  logoutUser() {
    localStorage.removeItem('jwtkey');
  }

}
