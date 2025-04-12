import { Component, inject } from '@angular/core';
import { IconsService } from '../../shared/data-access/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from '../product/data-access/product.service';
import { AlertService } from '../../shared/data-access/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user/data-access/user.service';
import { OrderService } from './data-access/order.service';

@Component({
  selector: 'app-order',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  productService = inject(ProductService)
  alertService = inject(AlertService)
  userService = inject(UserService)
  orderService = inject(OrderService)
  iconService = inject(IconsService)

  products: any[] = []
  product: any = {}
  users: any[] = []
  user: any = {}

  selectedQuantity: number = 0;
  orderItems: any[] = [];

  total: number = 0;
  selectedUserId: number | null = null;
  selectedProductId: number | null = null;
  paymentMethod: string = '';

  ngOnInit() {
    this.getAllProducts();
    this.getAllUsers();
  }

  getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => this.products = response,
      error: () => this.alertService.error("Error al cargar los productos", 'error')
    });
  }

  getAllUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => this.users = response,
      error: () => this.alertService.error("Error al cargar los usuarios", 'error')
    });
  }

  onUserChange(event: Event) {
    const id = +(event.target as HTMLSelectElement).value;
    this.selectedUserId = id;
    this.user = this.users.find(u => u.id === id) || {};
  }

  onProductChange(event: Event) {
    this.selectedQuantity = 1
    const id = +(event.target as HTMLSelectElement).value;
    this.selectedProductId = id;
    this.product = this.products.find(p => p.id === id) || {};
  }

  addProductToOrder() {
    if (!this.selectedProductId || this.selectedQuantity <= 0) {
      this.alertService.toast("Selecciona un producto válido y una cantidad mayor a cero", 'error');
      return;
    }

    const existingItem = this.orderItems.find(item => item.product.id === this.product.id);
    if (existingItem) {
      existingItem.quantity += this.selectedQuantity;
      existingItem.subtotal = existingItem.quantity * existingItem.price;
    } else {
      this.orderItems.push({
        product: this.product,
        quantity: this.selectedQuantity,
        price: this.product.price,
        name: this.product.name,
        subtotal: this.product.price * this.selectedQuantity
      });
    }

    this.calculateTotal();

    this.selectedQuantity = 0;
    this.selectedProductId = null;
    this.product = {};
  }

  calculateTotal() {
    this.total = this.orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  }

  removeProduct(index: number) {
    this.orderItems.splice(index, 1);
    this.calculateTotal();
  }

  editQuantity(index: number, newQuantity: number) {
    if (newQuantity <= 0) {
      this.alertService.toast("La cantidad debe ser mayor a cero", 'error');
      return;
    }
    const item = this.orderItems[index];
    item.quantity = newQuantity;
    item.subtotal = item.price * newQuantity;
    this.calculateTotal();
  }

  sendOrder() {
    if (!this.selectedUserId) {
      this.alertService.toast("Selecciona un usuario para continuar", 'error');
      return;
    }

    if (!this.paymentMethod) {
      this.alertService.toast("Selecciona un método de pago", 'error');
      return;
    }

    if (this.orderItems.length === 0) {
      this.alertService.toast("Agrega al menos un producto a la orden", 'error');
      return;
    }

    const payload = {
      user: { id: this.selectedUserId },
      paymentMethod: this.paymentMethod,
      orderDate: new Date(),
      totalPrice: this.total,
      items: this.orderItems.map(item => ({
        product: { id: item.product.id },
        quantity: item.quantity,
        price: item.price,
        subtotal: item.quantity * item.price
      }))
    };

    this.orderService.save(payload).subscribe({
      next: () => {
        this.alertService.toast("Orden realizada con éxito");
        this.resetForm();
      },
      error: () => {
        this.alertService.toast("Hubo un error al enviar la orden", 'error');
      }
    });
  }

  resetForm() {
    this.selectedQuantity = 0;
    this.orderItems = [];
    this.total = 0;
    this.selectedUserId = null;
    this.selectedProductId = null;
    this.paymentMethod = '';
    this.user = {};
    this.product = {};
  }

  getIcon(icon: string): IconDefinition {
    return this.iconService.getIcon(icon);
  }
}
