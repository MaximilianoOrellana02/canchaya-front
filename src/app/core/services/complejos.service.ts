import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Complejo } from "../models/complejo.interface";

@Injectable({
    providedIn: 'root'
})

export class ComplejosService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    getComplejos(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/complejos`)
    }
}