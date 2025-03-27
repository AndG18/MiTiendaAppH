import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule,  HttpClientModule],
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  products: any[] = [];
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    console.log('FolderPage loaded')
    this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;
    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: async (err) => {
        this.loading = false;
        const toast = await this.toastCtrl.create({
          message: 'Error al cargar productos',
          duration: 2000
        });
        toast.present();
      }
    });
  }

  async addToCart(product: any) {
    const toast = await this.toastCtrl.create({
      message: 'Debes iniciar sesión para agregar productos al carrito',
      duration: 2000,
    });
    toast.present();
    this.navCtrl.navigateForward('/login');
  }

}
