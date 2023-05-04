import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/config';
import { snakeCase } from 'src/utils';

interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
  results: PCModification[] | PCComponent[];
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private client: HttpClient) {}

  loading: boolean = false;

  getListModification(): Observable<Pagination> {
    this.loading = true;
    return this.client.get<Pagination>(
      `${BASE_URL}/configurator/modifications/`
    );
  }
  getListPCComponent(type: string): Observable<Pagination> {
    this.loading = true;
    return this.client.get<Pagination>(`${BASE_URL}/configurator/${type}/`);
  }
  getNewPage(url: string): Observable<Pagination> {
    this.loading = true;
    return this.client.get<Pagination>(url);
  }
  getModification(id: number): Observable<PCModification> {
    this.loading = true;
    return this.client.get<PCModification>(
      `${BASE_URL}/configurator/modifications/${id}/`
    );
  }
  getComponent(id: number, type: string): Observable<PCComponent> {
    this.loading = true;
    return this.client.get<PCComponent>(
      `${BASE_URL}/configurator/${type}/${id}/`
    );
  }
  toTypesID(modification: PCModification) {
    return modification.components.reduce((x, val) => ({...x, [snakeCase(val.type)]: val.id}), {})
  }
  addModification(modification: PCModification): Observable<PCModification> {
    let typesID = this.toTypesID(modification);

    return this.client.post<PCModification>(
      `${BASE_URL}/configurator/modifications/`,
      {
        name: modification.name,
        description: modification.description,
        author_name: modification.author_name,
        likes: modification.likes,
        cooling: 1,
        ...typesID
      }
    );
  }
  updateModification(modification: PCModification): Observable<PCModification> {
    let typesID = this.toTypesID(modification);
    
    return this.client.put<PCModification>(
      `${BASE_URL}/configurator/modifications/${modification.id}/`,
      {
        name: modification.name,
        description: modification.description,
        author_name: modification.author_name,
        likes: modification.likes + 1,
        cooling: 1,
        ...typesID
      }
    );
  }
  deleteModification(id: number) {
    return this.client.delete<any>(
      `${BASE_URL}/configurator/modifications/${id}/`
    );
  }
}
