import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Injectable } from '@angular/core';


@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.scss']
})

@Injectable()
export class MyLoansComponent implements OnInit {
  open: boolean = false
  showCloseButton: boolean = true;
  title = 'My Loans'

  numLoans: number = 0;

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

  getNumLoans() {
    return Object.keys(this.myLoans.Current).length;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    var api = "http://localhost:4000/isLogged";
    var rout = this.router;
    axios.get(api, { withCredentials: true }).then(response => {

      api = "http://localhost:4001/getOwnLoans";
      axios.get(api, { withCredentials: true }).then(res => {

        console.log(res.data);
        
      }).catch(err => console.log(err));

    }).catch(err => {
      console.log(err);
      rout.navigate(['./']);
    });
  }

}
