import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjetas',
  templateUrl: './listar-tarjetas.component.html',
  styleUrls: ['./listar-tarjetas.component.css']
})
export class ListarTarjetasComponent implements OnInit {
  listTarjetas: TarjetaCredito[] = [];

  constructor(private _tarjetaService: TarjetaService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.obtenerTarjetas().subscribe(doc =>{
      this.listTarjetas = [];
      doc.forEach((element: any) => {
        this.listTarjetas.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.listTarjetas);
    })
  }
  eliminarTarjeta(id: any){
    this._tarjetaService.eliminarTarjeta(id).then(() => {
      this.toastr.success('La tarjeta se elimino corectamente','Registro Eliminado')
    }, error =>{
      this.toastr.error('Upps... Ocurrio un error al eliminar tarjeta','Error');
      console.log(error);
    })
  }

  editarTarjeta(tarjeta: TarjetaCredito){

  }

  editarTarjet(tarjeta: TarjetaCredito){
    this._tarjetaService.addTarjetaEddit(tarjeta);
  }
}
