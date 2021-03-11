import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationUser } from 'src/app/shared/types/registration-user.type';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<RegistrationUser> {
    return this.http.post<RegistrationUser>(
      environment.apiKey,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(delay(2000));
  }
}
