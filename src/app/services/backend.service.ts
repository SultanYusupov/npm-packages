import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPackage} from '../interfaces/IPackage';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  private URL: string = "http://localhost:3000";

  getPackages() {
    return this.http.get<IPackage[]>(this.URL+'/packages');
  }

  getDependencies(id: string) {
    return this.http.get<IPackage[]>(`${this.URL}/${id}/dependencies`);
  }
}
