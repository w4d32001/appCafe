import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsService } from '../../shared/data-access/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from './data-access/category.service';
import { CategoryModalComponent } from './ui/category-modal/category-modal.component';
import { AlertService } from '../../shared/data-access/alert.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [FontAwesomeModule, CategoryModalComponent, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categoryService = inject(CategoryService);
  alertService = inject(AlertService);

  categories: any[] = [];
  searchTerm = '';
  filteredCategories: any[] = [];

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response;
        this.filteredCategories = response
      },
      (error) => {
        this.alertService.toast("Error al cargar las categorias", 'error')
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
      this.alertService.confirm("Esta seguro de actualizar la categoria", () => {
        this.categoryService.update(data, data.id).subscribe(
          (response) => {
            this.alertService.toast('Categoria actualizada');
            this.modalVisible = false;
            this.getAll();
          },
          (error) => {
            this.alertService.toast('Hubo un error', 'error');
          }
        );
      })
    } else {
      this.categoryService.save(data).subscribe(
        (response) => {
          this.alertService.toast('Categoria creada');
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
    this.alertService.confirm('Esta seguro de eliminar esta categoria', () => {
      this.categoryService.delete(id).subscribe(
        (response) => {
          this.alertService.toast('Categoria eliminada');
          this.getAll();
        },
        (error) => {
          this.alertService.toast('Hubo un error', 'error');
        }
      );
    });
  }

  filterCategories() {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredCategories = this.categories.filter((category) =>
      category.name.toLowerCase().includes(term)
    );
  }

  iconService = inject(IconsService);

  getIcon(icon: string): IconDefinition {
    return this.iconService.getIcon(icon);
  }
}
