import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  open: boolean = false
  showCloseButton: boolean = true;
  title = 'Dashboard'


  Loans = [{
      "device": "Keyboard",
      "num": 1,
      "description": "Active",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }, {
      "device": "Keyboard",
      "num": 2,
      "description": "Pending",
      "loanDate": "10-11-2022",
      "finishDate": ""
      
    }, {
      "device": "Keyboard",
      "num": 3,
      "description": "Request",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }, {
      "device": "Keyboard",
      "num": 4,
      "description": "Not in Time",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }]



  Devices = 
          [{
      "device": "Keyboard",
      "num": 1,
      "description": "Active",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }, 
    {
      "device": "Keyboard",
      "num": 1,
      "description": "Active",
      "loanDate": "10-11-2022",
      "finishDate": ""
    },
    {
      "device": "Keyboard",
      "num": 1,
      "description": "Active",
      "loanDate": "10-11-2022",
      "finishDate": ""
    },
    {
      "device": "Keyboard",
      "num": 1,
      "description": "Active",
      "loanDate": "10-11-2022",
      "finishDate": ""
    },
    {
      "device": "Keyboard",
      "num": 1,
      "description": "Active",
      "loanDate": "10-11-2022",
      "finishDate": ""
    },{
      "device": "Keyboard",
      "num": 2,
      "description": "Pending",
      "loanDate": "10-11-2022",
      "finishDate": ""
      
    }, {
      "device": "Keyboard",
      "num": 2,
      "description": "Pending",
      "loanDate": "10-11-2022",
      "finishDate": ""
      
    }, {
      "device": "Keyboard",
      "num": 2,
      "description": "Pending",
      "loanDate": "10-11-2022",
      "finishDate": ""
      
    }, {
      "device": "Keyboard",
      "num": 2,
      "description": "Pending",
      "loanDate": "10-11-2022",
      "finishDate": ""
      
    }, 
    {
      "device": "Keyboard",
      "num": 3,
      "description": "Request",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }, {
      "device": "Keyboard",
      "num": 4,
      "description": "Not in Time",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }]





  public cont1 : number = 0;
  public cont2 : number = 0;
  public cont3 : number = 0;
  public cont4 : number = 0;

  add1() {
    this.cont1 += 1;
  }
  add2() {
    this.cont2 += 1;
  }
  add3() {
    this.cont3 += 1;
  }
  add4() {
    this.cont4 += 1;
  }
  
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
