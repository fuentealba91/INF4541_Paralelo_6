import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectivaService {

  url = 'http://localhost:80/PHP_BDD/';

  constructor(private http: HttpClient) { }

  listarDirectivas()
  {
    return this.http.get(`${this.url}listarDirectivas.php`);
  }
}
