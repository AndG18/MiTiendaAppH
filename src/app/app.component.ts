import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

interface AppPage {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {
  public appPages: AppPage[] = [];
  public isAuthenticated = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.isAuthenticated = !!user;

      if (this.isAuthenticated) {
        this.appPages = [
          { title: 'Home', url: '/home', icon: 'home' },
          { title: 'Carrito', url: '/cart', icon: 'cart' }
        ];
      } else {
        this.appPages = [
          { title: 'Inicio', url: '/folder/:id', icon: 'home' },
          { title: 'Login', url: '/login', icon: 'log-in' },
          { title: 'Carrito', url: '/cart', icon: 'cart' }
        ];
      }
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/folder/:id'])
    });
  }
}
