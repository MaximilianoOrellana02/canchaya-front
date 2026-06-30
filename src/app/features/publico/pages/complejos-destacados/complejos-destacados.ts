import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComplejosService } from '../../../../core/services/complejos.service';
import { Complejo } from '../../../../core/models/complejo.interface';

@Component({
  selector: 'app-complejos-destacados',
  imports: [CommonModule, RouterLink],
  templateUrl: './complejos-destacados.html',
  styleUrl: './complejos-destacados.css',
})
export class ComplejosDestacados implements OnInit {
  private complejosService = inject(ComplejosService);

  complejos: Complejo[] = [];

  ngOnInit(): void {
    this.obtenerComplejos();
  }

  obtenerComplejos() {
    this.complejosService.getComplejos().subscribe({
      next: (data) => {
        this.complejos = data.complejos;
        console.log('Lista: ', this.complejos);
      },
      error: (e) => {
        console.error('error:', e);
      }
    })
  }
}
