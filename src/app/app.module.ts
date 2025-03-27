import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';

const firebaseConfig = {
  apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(),
    HttpClientModule, ReactiveFormsModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule, AngularFirestoreModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule {}
