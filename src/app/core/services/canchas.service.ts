import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";
import { Cancha } from "../models/cancha.interface";

@Injectable({
    providedIn: 'root'
})

export class CanchasService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    getCanchas(): Observable<Cancha[]> {
        return this.http.get<Cancha[]>(`${this.apiUrl}/canchas`);
    }
}