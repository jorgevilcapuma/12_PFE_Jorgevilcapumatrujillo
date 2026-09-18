import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private http = inject(HttpClient);

  private apiUrlGet = 'https://openlibrary.org/search.json?q=don+quijote';
  private apiUrlPost = 'https://jsonplaceholder.typicode.com/posts';

  // GET
  obtenerLibros() {
    return this.http.get<any>(this.apiUrlGet);
  }

  // POST
  registrarLibro(libro: any) {
    return this.http.post<any>(this.apiUrlPost, libro);
  }

  // PUT (Editar)
  actualizarLibro(id: number | string, libro: any) {
    return this.http.put<any>(`${this.apiUrlPost}/${id}`, libro);
  }

  // DELETE (Eliminar)
  eliminarLibro(id: number | string) {
    return this.http.delete<any>(`${this.apiUrlPost}/${id}`);
  }

}