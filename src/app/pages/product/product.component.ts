import { Component, inject } from '@angular/core';
import { ProductModalComponent } from "./ui/product-modal/product-modal.component";
import { AlertService } from '../../shared/data-access/alert.service';
import { ProductService } from './data-access/product.service';
import { IconsService } from '../../shared/data-access/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [ProductModalComponent, FontAwesomeModule, FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productService = inject(ProductService);
  alertService = inject(AlertService);

  products: any[] = [];
  searchTerm = '';
  filteredProducts: any[] = [];

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = response
        console.log(response)
      },
      (error) => {
        this.alertService.toast("Error al cargar los productos", 'error')
      }
    );
  }

  modalVisible = false;
  isEditMode = false;
  selectedCategory = { name: '' };

  openModal(edit = false, category?: any) {
    this.isEditMode = edit;
    this.selectedCategory = edit ? { ...category } : { name: '' };
    this.modalVisible = true;
  }

  saveCategory(data: any) {
    if (this.isEditMode) {
      this.alertService.confirm("Esta seguro de actualizar el producto", () => {
        this.productService.update(data, data.id).subscribe(
          (response) => {
            this.alertService.toast('Producto actualizado');
            this.modalVisible = false;
            this.getAll();
          },
          (error) => {
            this.alertService.toast('Hubo un error', 'error');
          }
        );
      })
    } else {
      this.productService.save(data).subscribe(
        (response) => {
          this.alertService.toast('Producto creado');
          this.modalVisible = false;
          this.getAll();
        },
        (error) => {
          this.alertService.toast('Hubo un error', 'error');
        }
      );
    }
    this.modalVisible = false;
  }

  delete(id: number) {
    this.alertService.confirm('Esta seguro de eliminar este producto', () => {
      this.productService.delete(id).subscribe(
        (response) => {
          this.alertService.toast('Producto eliminado');
          this.getAll();
        },
        (error) => {
          this.alertService.toast('Hubo un error', 'error');
        }
      );
    });
  }

    filterProducts() {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredProducts = this.products.filter((category) =>
        category.name.toLowerCase().includes(term)
      );
    }

  iconService = inject(IconsService);

  getIcon(icon: string): IconDefinition {
    return this.iconService.getIcon(icon);
  }

  autoGrow(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const textareas = document.querySelectorAll('textarea');
      textareas.forEach((textarea: HTMLTextAreaElement) => {
        this.autoGrow(textarea);
      });
    });
  }
}
