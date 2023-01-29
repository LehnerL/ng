import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  img: string = '../assets/images/img.jpg';
  constructor() { MenuComponent.setShowMenu(false);}

  ngOnInit(): void {
  }

}
