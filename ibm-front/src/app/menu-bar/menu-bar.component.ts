import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyLoansComponent } from "../my-loans/my-loans.component";
import { ProfileComponent } from "../profile/profile.component";
import axios from 'axios';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})

export class MenuBarComponent implements OnInit {

  numLoan: number = 0;

  Profile = {
    "1": [{
      "name": "Erick Calderon",
      "department" : "Device Loans",
      "role" : "Administrator"
    }],
  };

  constructor(private router: Router, private loansNum: MyLoansComponent, public profileComponent: ProfileComponent) {
    this.numLoan = this.loansNum.getNumLoans();
    // console.log(this.numLoan);
  }
  
  logout() {
    var api = "http://169.51.205.229:30289/logout";
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
