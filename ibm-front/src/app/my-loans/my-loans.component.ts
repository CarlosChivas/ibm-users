import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.scss']
})
export class MyLoansComponent implements OnInit {
  title = 'My Loans'

  myLoans = {
    "Current": [{
      "device": "Keyboard",
      "description": "DELL keyboard"
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard"
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard"
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard"
    }],
    "In process": [{
      "device": "Mouse",
      "description": "HP mouse"
    }, {
      "device": "Mouse",
      "description": "HP mouse"
    }],
    "Past": [{
      "device": "Monitor",
      "description": "Acer monitor"
    }, {
      "device": "Monitor",
      "description": "Acer monitor"
    }, {
      "device": "Monitor",
      "description": "Acer monitor"
    }, {
      "device": "Monitor",
      "description": "Acer monitor"
    }, {
      "device": "Mouse",
      "description": "HP mouse"
    }, {
      "device": "Mouse",
      "description": "HP mouse"
    }, {
      "device": "Mouse",
      "description": "HP mouse"
    }, {
      "device": "Mouse",
      "description": "HP mouse"
    }],
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("ei");
    var api = "/isLogged";
    var rout = this.router;
    axios.get(api, {withCredentials:true}).then(function (response) {
      console.log("wacha -> ",response);
      if (response.status == 401)
        rout.navigate(['./']);
    })
  }

}
