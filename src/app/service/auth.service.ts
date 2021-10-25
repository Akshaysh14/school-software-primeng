import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(form: { name: string, email: string, password: string, recaptcha: string }) {
    return this.http.post(`${environment.api_url}/user/register/`, form);
  }

  login(form: { email: string, password: string }) {
    return this.http.post(`${environment.base_url}/api/token/`, form);
  }
}
