import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  loading = false;

  constructor(
    private apiService: ApiService,
    private toastCtrl: ToastController,
    private storage: Storage,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    // Asegurarse de inicializar Storage si aún no se ha creado
    this.storage.create();
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
    // Obtenemos el carrito actual, o inicializamos un arreglo vacío
    const currentCart = (await this.storage.get('cart')) || [];
    currentCart.push(product);
    await this.storage.set('cart', currentCart);
    const toast = await this.toastCtrl.create({
      message: `${product.name} añadido al carrito`,
      duration: 2000
    });
    toast.present();
  }

  goToCart() {
    this.navCtrl.navigateForward('/cart');
  }
}
