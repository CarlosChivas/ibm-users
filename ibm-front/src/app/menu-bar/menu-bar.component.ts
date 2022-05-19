import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(private router: Router) { }

  logout() {
    var api = "/logout";
    console.log(api);
    var rout = this.router;
    axios.get(api, { withCredentials: true }).then(function (response) {
      console.error(response);
      if (response.status == 200) {
        rout.navigate(['./']);
      }
    })
  }

  ngOnInit(): void {
  }

}
