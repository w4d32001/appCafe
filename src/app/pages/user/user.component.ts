import { Component, inject } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconsService } from '../../shared/data-access/icons.service';
import { UserService } from './data-access/user.service';
import { AlertService } from '../../shared/data-access/alert.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ModalUserComponent } from "./ui/modal-user/modal-user.component";

@Component({
  selector: 'app-user',
  imports: [CommonModule, FontAwesomeModule, FormsModule, ModalUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userService = inject(UserService);
  alertService = inject(AlertService);

  users: any[] = [];
  searchTerm = '';
  filteredUsers: any[] = [];

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        this.filteredUsers = response
        console.log(response)
      },
      (error) => {
        this.alertService.toast("Error al cargar los productos", 'error')
      }
    );
  }

  modalVisible = false;
  isEditMode = false;
  selectedUser = { username: '' };

  openModal(edit = false, user?: any) {
    this.isEditMode = edit;
    this.selectedUser = edit ? { ...user } : { username: '' };
    this.modalVisible = true;
  }

  saveUser(data: any) {
    if (this.isEditMode) {
      this.alertService.confirm("Esta seguro de actualizar el producto", () => {
        this.userService.update(data, data.id).subscribe(
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
      this.userService.save(data).subscribe(
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
      this.userService.delete(id).subscribe(
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

    filterUsers() {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredUsers = this.users.filter((item) =>
        item.username.toLowerCase().includes(term)
      );
    }

  iconService = inject(IconsService);

  getIcon(icon: string): IconDefinition {
    return this.iconService.getIcon(icon);
  }

 
}
