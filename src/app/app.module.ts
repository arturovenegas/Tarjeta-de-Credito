import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { ListarTarjetasComponent } from './components/listar-tarjetas/listar-tarjetas.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TarjetaComponent,
    ListarTarjetasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
