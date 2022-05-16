import { Component, OnInit } from '@angular/core';
import { ButtonModule, CheckboxModule  } from 'carbon-components-angular';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {

  columns = ["Emploee ID",
    "First Name",
    "Last Name",
    "Email",
    "Department",
    "Admin",
    "Focal Point",
    "Security"
  ];

  employees = [
    {
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    },{
      "emploeeID": 1,
      "firstName": "My First Name",
      "lastName": "My Last Name",
      "email": "example@email.com",
      "Department": "IBM",
      "isAdmin": true,
      "isFocalPoint": true,
      "isSecurity": false
    }
  ];

  constructor() { }

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
	}
	ngOnDestroy() {
	}

}
