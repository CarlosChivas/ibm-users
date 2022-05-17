import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ButtonModule, CheckboxModule  } from 'carbon-components-angular';

@Component({
  selector: 'app-focal-loans',
  templateUrl: './focal-loans.component.html',
  styleUrls: ['./focal-loans.component.scss']
})
export class FocalLoansComponent implements OnInit {

  columns = ["Employee ID",
    "Employee Name",
    "Device ID",
    "Device Type",
    "Brand",
    "Serial Number",
    "Accepted Conditions",
    "Security Authorization",
    "Returned"
  ];

  areaLoans = [
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    },
    {
      "employeeID": 1,
      "employeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": "",
      "secAuth": "",
      "returned": ""
    }
  ];

  constructor(private router: Router) { }

	deviceTypeFilters = [];
	radioFilter = null;

	radios = [
		{ color: "Accepted Conditions", checked: false },
		{ color: "Security Authorization", checked: false },
		{ color: "Returned", checked: false }
	];

	deviceType = [
		{ value: "Monitor", checked: false},
		{ value: "Keyboard", checked: false},
		{ value: "Mouse", checked: false}
	];

	onCheckboxChange() {
	}

	onRadioChange() {
	}

	resetFilters() {
		this.resetCheckboxList();
		this.resetRadios();
	}

	resetCheckboxList() {
		this.deviceTypeFilters = [];
		this.deviceType = this.deviceType.map(obj => ({ value: obj.value, checked: false }));
		this.applyFilters();
	}

	resetRadios() {
		this.radioFilter = null;
		this.radios = this.radios.map(obj => ({ color: obj.color, checked: false }));
		this.applyFilters();
	}

	applyFilters() {
	}

	ngOnInit() {
    var api = "/isLogged";
    var rout = this.router;
    axios.get(api, {withCredentials:true}).then(function (response) {
      if (response.status != 200)
        rout.navigate(['./home']);
    })
	}
	ngOnDestroy() {
	}

}
