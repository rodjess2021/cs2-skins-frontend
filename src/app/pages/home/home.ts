import { ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Categoria } from '../../services/categorias/categoria';
import { Skin } from '../../services/skins/skin';
import { Arma } from '../../services/armas/arma';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  //variables para entidades del backend
  armaForm!: FormGroup;
  skins: any[] = [];
  categorias: any[] = [];

  //variables para busquedor de skins
  skinsFiltradas: any[] = [];
  busquedaActual: string = '';


  //variable para bubbletext de informacion
  mostrarInfo: boolean = false;


  //pantalla de carga
  loading = true;

  //variables para carga de skins y categorias
  categoriasCargadas = false;
  skinsCargadas = false;

  constructor(
    public fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public categoria: Categoria,
    public skin: Skin,
    public arma: Arma
  ) { }

  ngOnInit(): void {

    console.log("Home init");

    this.armaForm = this.fb.group({
      nombre: ['', Validators.required],
      statTrak: [false],
      imagenUrl: ['', [Validators.required, Validators.pattern('^https?:\\/\\/.*(csmoney\\.com|csgoskins\\.gg).*')]],
      categoria: [null, Validators.required],
      skin: [null, Validators.required]
    })


    this.skin.getAllSkins().subscribe(resp => {
      this.skins = resp;
      this.skinsFiltradas = resp;

      this.skinsCargadas = true;

      this.validarCarga();
    },
      error => { console.error(error) })


    this.categoria.getAllCategorias().subscribe(resp => {

      console.log("categorias: ", resp);

      this.categorias = resp;
      this.categoriasCargadas = true;
      this.validarCarga();
      this.loading = false; //desaparece el loader y se muestra formulario
      this.cdr.detectChanges();
    },
      error => { console.error(error) })
  }

  seleccionarCategoria(cat: any): void {
    this.armaForm.patchValue({
      categoria: cat.id
    });

  }

  filtrarSkins(event: any): void {

    this.busquedaActual = event.target.value;

    const texto = event.target.value.toLowerCase();

    this.skinsFiltradas = this.skins.filter((skin: any) =>
      skin.nombre.toLowerCase().includes(texto)
    );
  }

  seleccionarSkin(item: any): void {

    this.armaForm.patchValue({
      skin: item.id
    });

    this.busquedaActual = item.nombre;

    this.skinsFiltradas = [];

    console.log("SKIN SELECCIONADA:", item);

  }


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

  validarCarga(): void {

    if (this.categoriasCargadas && this.skinsCargadas) {

      this.loading = false;

    }

  }


  //metodo de popup
  toggleInfo(event: Event): void {

    event.stopPropagation();

    this.mostrarInfo = !this.mostrarInfo;

  }

  @HostListener('document:click')
  clickFuera(): void {

    this.mostrarInfo = false;

  }

  onImageError(event: any) {
    const img = event.target;

    if (img.src.includes('no-image')) return;

    img.src = 'assets/no-image.png';
  }

  guardar(): void {
    if (this.armaForm.invalid) {

      this.armaForm.markAllAsTouched();
      return;
    }

    const armaEnviar = {

      nombre: this.armaForm.value.nombre,

      statTrak: this.armaForm.value.statTrak,

      imagenUrl: this.armaForm.value.imagenUrl,

      categoria: {
        id: this.armaForm.value.categoria
      },

      skin: {
        id: this.armaForm.value.skin
      }

    };


    console.log("ENVIANDO:", armaEnviar);

    this.arma.save(armaEnviar).subscribe({

      next: (resp: any) => {

        console.log("GUARDADO:", resp);

        //alert("Arma guardada correctamente");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Arma guardada correctamente",
          showConfirmButton: false,
          timer: 1500
        });

        this.armaForm.reset({
          statTrak: false
        });

        this.busquedaActual = '';
        this.skinsFiltradas = [];

      },

      error: (err) => {

        console.error(err);

        //alert("Error al guardar");
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al guardar :(",
          showConfirmButton: false,
          timer: 1500
        });

      }

    });
  }
}
