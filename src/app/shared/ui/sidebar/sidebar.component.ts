import { Component, inject } from '@angular/core';
import { dataSidebar } from './sidebar.data';
import { SidebarItemComponent } from "../sidebar-item/sidebar-item.component";
import { SidebarService } from '../../data-access/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarItemComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  sidebarService = inject(SidebarService)

  isOpen$ = this.sidebarService.sidebarState$;

  data = dataSidebar
}
