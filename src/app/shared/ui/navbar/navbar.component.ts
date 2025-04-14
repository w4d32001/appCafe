import { Component, inject } from '@angular/core';
import { SidebarService } from '../../data-access/sidebar.service';
import { IconsService } from '../../data-access/icons.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  sidebarService = inject(SidebarService)
  iconService = inject(IconsService)

  sidebar(){
    this.sidebarService.toggleSidebar()
  }

  getIcon(value: string): IconDefinition{
    return this.iconService.getIcon(value)
  }

}
