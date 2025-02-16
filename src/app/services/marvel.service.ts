import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import { Hero } from '../hero.interface';

interface MarvelApiResponse {
  data: {
    results: Hero[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private baseUrl = 'https://gateway.marvel.com/v1/public';
  private publicKey = environment.marvelPublicKey;
  private privateKey = environment.marvelPrivateKey;

  constructor(private http: HttpClient) {}

  private generateAuthParams(): string {
    const ts = new Date().getTime().toString();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();
    return `ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
  }

  getHeroes(limit: number = 20, offset: number = 0): Observable<Hero[]> {
    const authParams = this.generateAuthParams();
    const url = `${this.baseUrl}/characters?${authParams}&limit=${limit}&offset=${offset}`;
    
    return this.http.get<MarvelApiResponse>(url).pipe(
      map(response => response.data.results) 
    );
  }

  getHero(id: number): Observable<Hero | null> {
    const authParams = this.generateAuthParams();
    const url = `${this.baseUrl}/characters/${id}?${authParams}`;

    return this.http.get<MarvelApiResponse>(url).pipe(
      map(response => response.data?.results?.length ? response.data.results[0] : null)
    );
}


  searchHeroes(name: string): Observable<Hero[]> {
    const authParams = this.generateAuthParams();
    const url = `${this.baseUrl}/characters?${authParams}&nameStartsWith=${name}`;
    
    return this.http.get<MarvelApiResponse>(url).pipe(
      map(response => response.data.results) 
    );
  }
}
