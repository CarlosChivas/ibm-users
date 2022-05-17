import { Component, OnInit } from '@angular/core';
import { ButtonModule, CheckboxModule  } from 'carbon-components-angular';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})



export class RoleManagementComponent implements OnInit {
  searchText:any;
  nameSearch:string = ''
  columns = ["Emploee ID",
    "First Name",
    "Last Name",
    "Email",
    "Department",
    "Admin",
    "Focal Point",
    "Security"
  ];

  employees2 = [
    {
    emploeeID: 1,
    firstName: "My First Name",
    lastName: "My Last Name",
    email: "example@email.com",
    Department: "IBM",
    isAdmin: true,
    isFocalPoint: true,
    isSecurity: false
  },
  {
    emploeeID: 2,
    firstName: "Erick",
    lastName: "Calderon",
    email: "example@email.com",
    Department: "IBM",
    isAdmin: true,
    isFocalPoint: true,
    isSecurity: false
  }
];
  employees = [
    {
      emploeeID: 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      emploeeID: 2,
      "firstName": "Prueba",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      "emploeeID": 3,
      "firstName": "My First Name",
      "lastName": "Calderon",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": "",
      "isFocalPoint": "",
      "isSecurity": ""
    }
  ];

  constructor(private router: Router) { }





  
	deviceTypeFilters = [];

	deviceType = [
		{ value: "Admin", checked: false},
		{ value: "Focal Point", checked: false},
		{ value: "Security", checked: false}
	];



	onCheckboxChange() {
	}

	onRadioChange() {
	}

	resetFilters() {
		this.resetCheckboxList();
	}

	resetCheckboxList() {
		this.deviceTypeFilters = [];
		this.deviceType = this.deviceType.map(obj => ({ value: obj.value, checked: false }));
		this.applyFilters();
	}

	applyFilters() {
	}

	ngOnInit() {
    var api = "/isLogged";
    var rout = this.router;
    axios.get(api, {withCredentials:true}).then(function (response) {
      if (response.status != 200)
        rout.navigate(['./']);
    })
	}
	ngOnDestroy() {
	}

}

