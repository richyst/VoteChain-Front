import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';


import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { ProcesandoService } from './services/procesando.service';
import { VotarComponent } from './votos/votar/votar.component';
import { AnalisisComponent } from './votos/analisis/analisis.component';
import { MainComponent } from './votos/main/main.component';
import { AvisoComponent } from './shared/aviso/aviso.component';
import { VotosService } from './services/votos.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    VotarComponent,
    AnalisisComponent,
    MainComponent,
    AvisoComponent
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [appRoutingProviders, ProcesandoService, VotosService],
  bootstrap: [AppComponent],
  entryComponents: [AvisoComponent]
})
export class AppModule { }
