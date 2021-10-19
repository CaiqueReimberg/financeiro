import { Component } from '@angular/core';
import M from 'materialize-css';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent {
  constructor() { }
  public shouldRun = true;

  ngAfterViewInit(): void {
    setTimeout(function () {
      var elem = document.querySelector('.sidenav');
      M.Sidenav.init(elem, { preventScrolling: true });
    }, 0);
  }
}
