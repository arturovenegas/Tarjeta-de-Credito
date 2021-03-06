import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  loading = false;
  form: FormGroup;
  titulo = 'Crear Tarjeta';
  id: string | undefined;
  tituloBoton = 'Aceptar';

  constructor(private fb: FormBuilder, 
              private _tarjetaService: TarjetaService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })
   }

  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data =>{
      this.titulo = 'Editar Tarjeta'
      this.tituloBoton = 'Actualizar'
      this.id = data.id;
      this.form.patchValue({
        titular: data.titular,
        numeroTarjeta: data.numeroTarjeta,
        fechaExpiracion: data.fechaExpiracion,
        cvv: data.cvv
      })
    })
  }

  guardarTarjeta(){

    if (this.id === undefined) {
      //Crear Tarjeta
      this.agregarTarjeta();
      
    }else {
      //Actualizar Tarjeta
      this.editarTarjeta(this.id);
    }
  }

  editarTarjeta(id: string){
    const TARJETA: any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date()
    }

    this.loading = true;
    this._tarjetaService.editarTrjeta(id, TARJETA).then(() =>{
      this.loading = false;
      this.titulo = 'Agregar Tarjeta';
      this.form.reset();
      this.id = undefined;
      this.toastr.info('La tarjeta se actualizo con exito', 'Tarjeta Actualizda');
    }, error =>{
      console.log(error);
      this.loading = false;
    })
  }

  agregarTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loading = true;

    this._tarjetaService.guardarTarjeta(TARJETA).then(() =>{
      this.loading = false;
      console.log('Tarjeta Registrada');
      this.toastr.success('La Trajeta Fue Registrada con Exito', 'Tarjeta Registrada')
      this.form.reset();
    }, error =>{
      this.loading = false;
      this.toastr.error('UPSS! Ocurrio un error al registro', 'Error')
      console.log(error);
    })
  }

}
