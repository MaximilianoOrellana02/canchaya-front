import { Component, inject, OnInit, signal } from '@angular/core';
import { CanchasService } from '../../../../core/services/canchas.service';
import { Cancha } from '../../../../core/models/cancha.interface';

@Component({
  selector: 'app-canchas',
  standalone: true,
  imports: [],
  templateUrl: './canchas.html',
  styleUrl: './canchas.css',
})
export class Canchas implements OnInit {
  private canchaService = inject(CanchasService)

  canchas = signal<Cancha[]>([]);

  ngOnInit(): void {
    this.obtenerCanchas()
  }

  obtenerCanchas() {
    this.canchaService.getCanchas().subscribe({
      next: (response: Cancha[]) => {
        this.canchas.set(response)
        console.log(this.canchas());
      },
      error: (e) => {
        console.error(e);
      }
    })
  }
}
