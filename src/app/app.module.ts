import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase ....
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Routing Module...
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services..
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.serivce';
import { SettingsService } from './services/settings.service';

// Components...
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsCondComponent } from './components/terms-cond/terms-cond.component';
import { DialogueComponent } from './components/dialogue/dialogue.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

// Firebase configuration object...


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    TermsCondComponent,
    DialogueComponent,
    SettingsComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AngularFireAuth, AuthService, SettingsService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
