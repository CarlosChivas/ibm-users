import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.scss']
})
export class MyLoansComponent implements OnInit {
  open: boolean = false
  showCloseButton: boolean = true;
  title = 'My Loans'


  myLoans = {
    "Current": [{
      "device": "Keyboard",
      "description": "DELL keyboard",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard",
      "loanDate": "10-11-2022",
      "finishDate": ""
      
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }],
    "In process": [{
      "device": "Mouse",
      "description": "HP mouse",
      "loanDate": "",
      "finishDate": ""
    }, {
      "device": "Mouse",
      "description": "HP mouse",
      "loanDate": "",
      "finishDate": ""
    }],
    "Past": [{
      "device": "Monitor",
      "description": "Acer monitor",
      "loanDate": "",
      "finishDate": "10-11-2022"
    }, {
      "device": "Monitor",
      "description": "Acer monitor",
      "loanDate": "",
      "finishDate": "10-11-2022"
    }, {
      "device": "Monitor",
      "description": "Acer monitor",
      "loanDate": "",
      "finishDate": "10-11-2022"
    }, {
      "device": "Monitor",
      "description": "Acer monitor",
      "loanDate": "",
      "finishDate": "10-11-2022"
    }, {
      "device": "Mouse",
      "description": "HP mouse",
      "loanDate": "",
      "finishDate": "10-11-2022"
    }, {
      "device": "Mouse",
      "description": "HP mouse",
      "loanDate": "",
      "finishDate": "10-11-2022"
    }, {
      "device": "Mouse",
      "description": "HP mouse",
      "loanDate": "",
      "finishDate": "10-11-2022"
    }, {
      "device": "Mouse",
      "description": "HP mouse",
      "loanDate": "",
      "finishDate": "10-11-2022"
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
