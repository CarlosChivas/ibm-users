import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
