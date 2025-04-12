import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarOpen = new BehaviorSubject<boolean>(false); 
  sidebarState$ = this.sidebarOpen.asObservable(); 

  constructor() {}

  toggleSidebar(): void {
    this.sidebarOpen.next(!this.sidebarOpen.value); 
  }

  closeSidebar(): void {
    this.sidebarOpen.next(false);
  }

  openSidebar(): void {
    this.sidebarOpen.next(true);
  }
}
