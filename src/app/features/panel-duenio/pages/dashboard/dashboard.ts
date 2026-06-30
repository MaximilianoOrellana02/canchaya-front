import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  nombreUsuario: string = '';

  menuOpciones = [
    {
      titulo: 'Mis Complejos',
      icono: '🏢',
      ruta: '/panel-duenio/complejos',
      desc: 'Gestioná la información y horarios de tus predios.'
    },
    {
      titulo: 'Mis Canchas',
      icono: '⚽',
      ruta: '/panel-duenio/canchas',
      desc: 'Agregá canchas nuevas, editá precios y superficies.'
    },
    {
      titulo: 'Agenda de Turnos',
      icono: '📅',
      ruta: '/panel-duenio/agenda',
      desc: 'Revisá las reservas del día y el estado de los pagos.'
    }
  ];

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.nombreUsuario = usuario.nombre
    }
  }
}
