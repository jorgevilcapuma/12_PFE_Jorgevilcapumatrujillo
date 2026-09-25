import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Producto {
  id?: number;
  title: string;
  price: number;
  category?: string;
  thumbnail?: string;
  rating?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  // MÉTODO GET
  obtenerProductos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/mens-shirts`);
  }

  // MÉTODO POST
  registrarProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, producto);
  }

  // MÉTODO PUT
  actualizarProducto(id: number, producto: Producto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, producto);
  }

  // MÉTODO DELETE
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}