import { Component } from '@angular/core';
import { HeroJugador } from "../hero-jugador/hero-jugador";
import { ComplejosDestacados } from "../../../publico/pages/complejos-destacados/complejos-destacados";
import { Canchas } from "../../../publico/pages/canchas/canchas";

@Component({
  selector: 'app-home-jugador',
  imports: [HeroJugador, ComplejosDestacados, Canchas],
  templateUrl: './home-jugador.html',
  styleUrl: './home-jugador.css',
})
export class HomeJugador { }
