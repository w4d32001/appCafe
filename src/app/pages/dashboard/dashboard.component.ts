import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../category/data-access/category.service';
import { ProductService } from '../product/data-access/product.service';
import { OrderService } from '../order/data-access/order.service';
import { AlertService } from '../../shared/data-access/alert.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  categoryService = inject(CategoryService)
  productService = inject(ProductService)
  orderService = inject(OrderService)
  alertService = inject(AlertService)

  totalCategories = 0
  totalProducts = 0
  totalOrders = 0

  ngOnInit(){
    this.getTotalCategories()
    this.getTotalOrders()
    this.getTotalProducts()
  }

  getTotalCategories(){
    this.categoryService.totalCategories().subscribe(
      (response) => {
        this.totalCategories = response
      },
      (error) => {
        this.alertService.toast('Error al traer el total de categorias', 'error')
      }
    )
  }

  getTotalProducts(){
    this.productService.totalProducts().subscribe(
      (response) => {
        this.totalProducts = response
      },
      (error) => {
        this.alertService.toast('Error al traer el total de productos', 'error')
      }
    )
  }

  getTotalOrders(){
    this.orderService.totalOrders().subscribe(
      (response) => {
        this.totalOrders = response
      },
      (error) => {
        this.alertService.toast('Error al traer el total de ordenes', 'error')
      }
    )
  }

}
