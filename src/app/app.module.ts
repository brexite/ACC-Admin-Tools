import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import {HttpClientModule} from '@angular/common/http';
import { RaceCreationToolComponent } from './race-creation-tool/race-creation-tool.component';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const config = {
  apiKey: 'AIzaSyAMWPxYMMFB_8JDGq3Fb0SHV8IEcQBU-SA',
  authDomain: 'acc-admin-tools.firebaseapp.com',
  projectId: 'acc-admin-tools',
  storageBucket: 'acc-admin-tools.appspot.com',
  messagingSenderId: '420480812472',
  appId: '1:420480812472:web:d426dd6fb49466e372fb4d',
  measurementId: 'G-FGEPV6YTNK',
};

@NgModule({
  declarations: [AppComponent, RaceCreationToolComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    ClipboardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    // AngularFirestoreModule, // firestore
    // AngularFireAuthModule, // auth
    // AngularFireStorageModule // storage
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
