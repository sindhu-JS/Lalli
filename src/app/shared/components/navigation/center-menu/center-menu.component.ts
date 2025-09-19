import { Component, OnInit } from '@angular/core';
import { Menu, NavService } from '../../../../shared/service/nav.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-center-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './center-menu.component.html',
  styleUrls: ['./center-menu.component.scss']
})
export class CenterMenuComponent implements OnInit {
  public menuItems: Menu[];
  public openSide  = false;
  public activeItem = 'home';
  public active = false;
  public activeChildItem  = '';
  public overlay = false;

  constructor(public navServices: NavService) { }

  ngOnInit() {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems
    });
  }

  toggleSidebar(){
    this.openSide = !this.openSide
  }

  closeOverlay(){
    this.openSide = false
  }


  setActive(menuItem: string | undefined) {
    const item = menuItem || '';
    if (this.activeItem === item) {
      this.activeItem = '';
    } else {
      this.activeItem = item;
    }
  }

  isActive(item:string | undefined){
    const items= item || '';
    return this.activeItem === items 
  }

  // For Active Child Menu in Mobile View
  setChildActive(subMenu: string | undefined){
    const item = subMenu || '';
    if (this.activeChildItem === item) {
      this.activeChildItem = ''
    } else {
      this.activeChildItem = item
    }
  }

  ischildActive(subMenu: string | undefined){
    const item = subMenu || '';
    return this.activeChildItem === item
  }

  

}
