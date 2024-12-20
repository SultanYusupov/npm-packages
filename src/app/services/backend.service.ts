import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPackage} from '../interfaces/IPackage';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private URL: string = "http://localhost:3000";
  sync: boolean = false;
  http = inject(HttpClient);

  getPackages() {
    return this.http.get<IPackage[]>(this.URL+'/packages');
  }

  getDependencies(id: string) {
    return this.http.get<string[]>(`${this.URL}/packages/${id}/dependencies`);
  }
}
