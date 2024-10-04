import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IPackage} from '../interfaces/IPackage';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private URL: string = "http://localhost:3000";
  http = inject(HttpClient);

  getPackages() {
    return this.http.get<IPackage[]>(this.URL+'/packages');
  }

  getDependencies(id: string) {
    return this.http.get<IPackage[]>(`${this.URL}/${id}/dependencies`);
  }
}
