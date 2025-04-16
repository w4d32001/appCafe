import { Component, inject } from '@angular/core';
import { ModalSustiComponent } from "./ui/modal-susti/modal-susti.component";
import { IconsService } from '../../shared/data-access/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SustiService } from './data-access/susti.service';
import { AlertService } from '../../shared/data-access/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-susti',
  imports: [ModalSustiComponent, FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './susti.component.html',
  styleUrl: './susti.component.css'
})
export class SustiComponent {
    sustiService = inject(SustiService);
    alertService = inject(AlertService);
  
    data: any[] = [];
    searchTerm = '';
    filtered: any[] = [];
  
    ngOnInit() {
      this.getAll();
    }
  
    getAll() {
      this.sustiService.getAll().subscribe(
        (response) => {
          this.data = response;
          this.filtered = response
          console.log(response)
        },
        (error) => {
          this.alertService.toast("Error al cargar los datos", 'error')
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
        this.alertService.confirm("Esta seguro de actualizar el Dato", () => {
          this.sustiService.update(data, data.dni).subscribe(
            (response) => {
              this.alertService.toast('Dato actualizado');
              this.modalVisible = false;
              this.getAll();
            },
            (error) => {
              this.alertService.toast('Hubo un error', 'error');
            }
          );
        })
      } else {
        this.sustiService.save(data).subscribe(
          (response) => {
            this.alertService.toast('Dato creado');
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
      this.alertService.confirm('Esta seguro de eliminar', () => {
        this.sustiService.delete(id).subscribe(
          (response) => {
            this.alertService.toast('Eliminado');
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
        this.filtered = this.data.filter((category) =>
          category.name.toLowerCase().includes(term)
        );
      }
  
    iconService = inject(IconsService);
  
    getIcon(icon: string): IconDefinition {
      return this.iconService.getIcon(icon);
    }
}
