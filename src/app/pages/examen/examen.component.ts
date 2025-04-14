import { Component, inject } from '@angular/core';
import { AlertService } from '../../shared/data-access/alert.service';
import { ExamenService } from './data-access/examen.service';
import { IconsService } from '../../shared/data-access/icons.service';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ModalExamenComponent } from "./ui/modal-examen/modal-examen.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-examen',
  imports: [FontAwesomeModule, FormsModule, ModalExamenComponent, CommonModule],
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css'
})
export class ExamenComponent {
 
    examenService = inject(ExamenService);
    alertService = inject(AlertService);
  
    data: any[] = [];
    searchTerm = '';
    filtered: any[] = [];
  
    ngOnInit() {
      this.getAll();
    }
  
    getAll() {
      this.examenService.getAll().subscribe(
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
          this.examenService.update(data, data.id).subscribe(
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
        this.examenService.save(data).subscribe(
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
        this.examenService.delete(id).subscribe(
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
          category.brand.toLowerCase().includes(term)
        );
      }
  
    iconService = inject(IconsService);
  
    getIcon(icon: string): IconDefinition {
      return this.iconService.getIcon(icon);
    }
  

}
