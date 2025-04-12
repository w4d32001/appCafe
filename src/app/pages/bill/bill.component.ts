import { Component, inject } from '@angular/core';
import { BillService } from './data-access/bill.service';
import { AlertService } from '../../shared/data-access/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bill',
  imports: [CommonModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css'
})
export class BillComponent {

  billService = inject(BillService)
  alertService = inject(AlertService)

  bills: any[] = []

  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.billService.getAll().subscribe(
      (response) => {
        this.bills = response
        console.log(response)
      },
      (error) => {
        this.alertService.toast('Error al cargar las facturas', 'error')
      }
    )
  }

}
