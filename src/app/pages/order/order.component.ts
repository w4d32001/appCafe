import { Component, inject } from '@angular/core';
import { IconsService } from '../../shared/data-access/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from '../product/data-access/product.service';
import { AlertService } from '../../shared/data-access/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  productService = inject(ProductService)
  alertService = inject(AlertService)

  products: any[] = []
  product: any = {}

  selectedQuantity: number = 0;

  orderItems: any[] = [];

  total: number = 0;


  ngOnInit(){
    this.getAllProducts()
  }

  getAllProducts(){
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response
      },
      (error) => {
        this.alertService.error("Error al cargar los productos", 'error')
      }
    )
  }

  getProduct(id: number){
    this.productService.getProduct(id).subscribe(
      (response) => {
        this.product = response
      },
      (error) => {
        this.alertService.toast("Error el producto", 'error')
      }
    )
  }

  onProductChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedProductId = Number(selectElement.value);
  
    if (selectedProductId) {
      this.getProduct(selectedProductId);
      this.selectedQuantity = 1
    } else {
      this.product = {};
    }
  }


  addProductToOrder() {
    if (!this.product || !this.selectedQuantity || this.selectedQuantity <= 0) return;

    const subtotal = this.product.price * this.selectedQuantity;

    this.orderItems.push({
      ...this.product,
      quantity: this.selectedQuantity,
      subtotal
    });

    this.calculateTotal();
    this.selectedQuantity = 1;
  }

  calculateTotal() {
    this.total = this.orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  }

  removeProduct(index: number) {
    this.orderItems.splice(index, 1);
    this.calculateTotal();
  }

  editQuantity(index: number, newQuantity: number) {
    const item = this.orderItems[index];
    item.quantity = newQuantity;
    item.subtotal = item.price * newQuantity;
    this.calculateTotal();
  }


  iconService = inject(IconsService)

  getIcon(icon: string): IconDefinition{
    return this.iconService.getIcon(icon);
  }

}
