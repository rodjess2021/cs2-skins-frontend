import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Arma } from '../../services/armas/arma';

@Component({
  selector: 'app-ver-armas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ver-armas.html',
  styleUrl: './ver-armas.css',
})
export class VerArmas implements OnInit{
  armas: any[] = [];

  constructor(
    private arma: Arma,
    private cdr: ChangeDetectorRef
  ) {}

  getColor(nombre: string): string {
    switch (nombre) {
      case 'gris': return '#808080';
      case 'azul_claro': return '#5bc0de';
      case 'azul_oscuro': return '#003366';
      case 'morado': return '#800080';
      case 'rosa': return '#FF00F7';
      case 'rojo': return '#D10000';
      default: return 'black';
    }
  }

ngOnInit(): void {

  this.arma.getAllArmas().subscribe({

    next: (resp: any) => {

      this.armas = resp;
      this.cdr.detectChanges();

    },

    error: (err: any) => {

      console.error(err);

    }

  });

}
}
