import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonicModule], // No se debe incluir Storage aquí
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];
  total = 0;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.loadCart();
  }

  async loadCart() {
    const items = await this.storage.get('cart');
    this.cartItems = items ? items : [];
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
  }

  async addItem(item: any) {
    this.cartItems.push(item);
    await this.storage.set('cart', this.cartItems);
    this.calculateTotal();
  }

  async removeItem(index: number) {
    this.cartItems.splice(index, 1);
    await this.storage.set('cart', this.cartItems);
    this.calculateTotal();
  }
}
