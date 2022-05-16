import { Component, OnInit } from '@angular/core';
import { ButtonModule, CheckboxModule  } from 'carbon-components-angular';

@Component({
  selector: 'app-focal-loans',
  templateUrl: './focal-loans.component.html',
  styleUrls: ['./focal-loans.component.scss']
})
export class FocalLoansComponent implements OnInit {

  columns = ["Emploee ID",
    "Emploee Name",
    "Device ID",
    "Device Type",
    "Brand",
    "Serian Number",
    "Accepted Conditions",
    "Security Authorization",
    "Returned"
  ];

  areaLoans = [
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    },
    {
      "emploeeID": 1,
      "emploeeName": "Clark Kent",
      "deviceID": 420,
      "deviceType": "Monitor",
      "deviceBrand": "IBM",
      "serialNumber": "TVD",
      "termsConditions": true,
      "secAuth": false,
      "returned": false
    }
  ];

  constructor() { }

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
	}
	ngOnDestroy() {
	}

}
