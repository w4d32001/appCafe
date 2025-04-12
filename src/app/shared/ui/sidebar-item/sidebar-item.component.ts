import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-item',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css'
})
export class SidebarItemComponent {
  @Input() icon: IconDefinition = faHome; 
  @Input() label: string = "link";        
  @Input() link: string = '#';   
  @Input() borderColor: string = 'purple-600'; 
}
