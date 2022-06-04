import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Injectable } from '@angular/core';

interface Device {
  PERIOHERAL_SERIAL: number,
  TYPE: string,
  BRAND: string,
  MODEL: string,
  DESCRIPTION: string,

  CREATION: string;
  CONCLUDED: string;
  CONDITION_ACCEPTED: boolean;
  SECURITY_AUTH: boolean;
};

interface MyClass {
  "borrowed": Device[];
  "in_process": Device[];
  "concluded": Device[];
}
type OnlyKeys = keyof MyClass;

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

  headers: { title: string; val: string }[] = [
    { title: "Borrowed", val: "borrowed" },
    { title: "In Process", val: "in_process" },
    { title: "Concluded", val: "concluded" }];
  myLoans: MyClass = {
    borrowed: [],
    in_process: [],
    concluded: []
  };

  getNumLoans() {
    return Object.keys(this.myLoans.borrowed).length;
  }

  constructor(private router: Router) {
    console.log(this.headers);
  }

  ngOnInit(): void {
    var api = "http://localhost:4000/isLogged";
    var rout = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then(response => {

      api = "http://localhost:4001/getOwnLoans";
      axios.get(api, { withCredentials: true }).then(res => {

        console.log(res.data.in_process[0]);
        //esto.myLoans = res.data;
        // Delete comment when API returns correct structure

      }).catch(err => console.log(err));

    }).catch(err => {
      console.log(err);
      rout.navigate(['./']);
    });
  }

}

/*
//Para getOwnLoans y getLoans/id:=
    var DEVICE = {
      PERIPHERAL_SERIAL: "",
      TYPE: "",
      BRAND: "",
      MODEL: "",
      DESCRIPTION: "",

      CREATION: "",
      CONCLUDED: "",
      CONDITION_ACCEPTED: "",
      SECURITY_AUTH: "",
    };
*/