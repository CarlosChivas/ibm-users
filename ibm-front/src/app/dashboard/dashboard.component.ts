import { NumberFormatStyle } from '@angular/common';
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

    data1 = [
      {
          "group": "Keyboard",
          "value": Math.floor(Math.random() * 100),
      },
      {
          "group": "Mouse",
          "value": Math.floor(Math.random() * 100)
      },
      {
          "group": "Monitor",
          "value": Math.floor(Math.random() * 100)
      },
      {
          "group": "Headphones",
          "value": Math.floor(Math.random() * 100)
      },
      {
          "group": "Speakers",
          "value": Math.floor(Math.random() * 100)
      },
      {
        "group": "Microphone",
        "value": Math.floor(Math.random() * 100)
      },
      {
          "group": "Web Cam",
          "value": Math.floor(Math.random() * 100)
      },
      {
          "group": "Hard Drive",
          "value": Math.floor(Math.random() * 100)
      },
      {
        "group": "Trackpad",
        "value": Math.floor(Math.random() * 100)
      },
      {
          "group": "Router",
          "value": Math.floor(Math.random() * 100)
      }
  ];

    vals: number[] = [];
    otherVals: number[] = [];
    sumOfVals: number = 0;
    randNum: number = 0;

    sumVals() {
      for (let i = 0; i < this.data1.length; i++) {
        this.vals.push(this.data1[i].value);
        this.sumOfVals = this.sumOfVals + this.data1[i].value;
      }
      //console.log(this.sumOfVals);
    }

    randomNums(num: number) {
      for (let i = 0; i < 5; i++) {
        this.randNum = Math.floor(Math.random() * num/6);
        this.otherVals.push(this.randNum*2);
      }
      let sum = 0;
      for (let i = 0; i < this.otherVals.length; i++) {
        sum += this.otherVals[i];
      }
      if (sum > num) {
        this.randomNums(num);
      } else { 
        this.otherVals.push(num - sum);
      }
    }

    options1 = {
      "title": "Total Device Loan",
      "axes": {
          "left": {
              "mapsTo": "group",
              "scaleType": "labels"
          },
          "bottom": {
              "mapsTo": "value"
          }
      },
      "legend": {
        "alignment": "center"
      },
      "height": "400px"
  };

  public randomNum: number = Math.floor(Math.random() * 1000);
  
    data2 = [
      {
        group: "On-site",
        value: 500
      },
      {
        group: "Loaned",
        value: 500
      }
    ];

    options2 = {
      title: "Device Availability",
      resizable: true,
      "legend": {
        "alignment": "center"
      },
      "donut": {
        center: {
          label: "Devices"
        },
        "alignment": "center"
      },
      height: "400px"
    };

    data3 = [
      {
        group: "Finances",
        value: 10
      },
      {
        group: "Human Resources",
        value: 10
      },
      {
        group: "Managment",
        value: 10
      },
      {
        group: "Software",
        value: 10
      },
      {
        group: "Marketing",
        value: 10
      },
      {
        group: "Sales",
        value: 10
      }
    ];

    options3 = {
      title: "Loans Per Area",
      resizable: true,
      "legend": {
        "alignment": "center"
      },
      "pie": {
        "alignment": "center"
      },
      height: "400px"
    };
  

  public cont1 : number = 0;
  public cont2 : number = 0;
  public cont3 : number = 0;
  public cont4 : number = 0;

  /*add1() {
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
  }*/
  
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

    this.cont1 = Math.floor(Math.random() * 10);
    this.cont2 = Math.floor(Math.random() * 10);
    this.cont3 = Math.floor(Math.random() * 10);
    this.cont4 = Math.floor(Math.random() * 10);

    this.sumVals();
    this.data2 = [
      {
        group: "On-site",
        value: 1000 - this.sumOfVals
      },
      {
        group: "Loaned",
        value: this.sumOfVals
      }
    ];

    this.randomNums(this.sumOfVals);
    this.data3 = [
      {
        group: "Finances",
        value: this.otherVals[0]
      },
      {
        group: "Human Resources",
        value: this.otherVals[1]
      },
      {
        group: "Managment",
        value: this.otherVals[2]
      },
      {
        group: "Software",
        value: this.otherVals[3]
      },
      {
        group: "Marketing",
        value: this.otherVals[4]
      },
      {
        group: "Sales",
        value: this.otherVals[5]
      }
    ];
  }

}
