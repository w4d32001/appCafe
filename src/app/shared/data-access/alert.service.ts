import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  success(message: string, title: string = 'Éxito') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  error(message: string, title: string = 'Error') {
    Swal.fire({
      title: title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }

  confirm(message: string, callback: () => void) {
    Swal.fire({
      title: 'Confirmar',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  }

  toast(message: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') {
    Swal.fire({
      toast: true,
      position: 'top-end', 
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 2000, 
      timerProgressBar: true,
    });
  }

}
