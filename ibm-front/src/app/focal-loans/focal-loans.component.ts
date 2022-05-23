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

  isOpen: boolean = false
  showCloseButton: boolean = true;
  specific = {
    employeeID: 0,
    employeeName: 'No employee asigned',
    deviceType: "No type",
    deviceBrand: "No brand",
    serialNumber: "N/A",
    termsConditions: false,
    secAuth: false,
    returned: false
  };

  columns = ["Employee ID",
    "Employee Name",
    "Device Type",
    "Brand",
    "Serial Number",
    "Accepted Conditions",
    "Security Authorization",
    "Returned"
  ];

  areaLoans = [
    {
      employeeID: 2,
      employeeName: "Name 1",
      deviceType: "Monitor",
      deviceBrand: "ACER",
      serialNumber: "10007",
      termsConditions: false,
      secAuth: false,
      returned: false
    },
    {
      employeeID: 3,
      employeeName: "Name 2",
      deviceType: "Headphones",
      deviceBrand: "SONY",
      serialNumber: "10009",
      termsConditions: false,
      secAuth: false,
      returned: false
    },
    {
      employeeID: 5,
      employeeName: "Name 3",
      deviceType: "MOUSE",
      deviceBrand: "HP",
      serialNumber: "10037",
      termsConditions: true,
      secAuth: false,
      returned: false
    },
    {
      employeeID: 7,
      employeeName: "Name 4",
      deviceType: "KEY BOARD",
      deviceBrand: "DELL",
      serialNumber: "10039",
      termsConditions: true,
      secAuth: false,
      returned: false
    },
    {
      employeeID: 11,
      employeeName: "Name 5",
      deviceType: "SPEAKERS",
      deviceBrand: "BOSE",
      serialNumber: "10061",
      termsConditions: true,
      secAuth: true,
      returned: false
    },
    {
      employeeID: 13,
      employeeName: "Name 6",
      deviceType: "MICROPHONE",
      deviceBrand: "BLUE YETI",
      serialNumber: "10069",
      termsConditions: true,
      secAuth: true,
      returned: false
    },
    {
      employeeID: 17,
      employeeName: "Name 7",
      deviceType: "HARD DRIVE",
      deviceBrand: "KINGSTONE",
      serialNumber: "10079",
      termsConditions: true,
      secAuth: true,
      returned: false
    },
    {
      employeeID: 19,
      employeeName: "Name 8",
      deviceType: "WEB CAM",
      deviceBrand: "LOGITECH",
      serialNumber: "10091",
      termsConditions: true,
      secAuth: true,
      returned: true
    },
    {
      employeeID: 23,
      employeeName: "Name 9",
      deviceType: "TRACK PAD",
      deviceBrand: "APPLE",
      serialNumber: "10099",
      termsConditions: true,
      secAuth: true,
      returned: true
    },
    {
      employeeID: 29,
      employeeName: "Name 10",
      deviceType: "ROUTER",
      deviceBrand: "TP-LINK",
      serialNumber: "10103",
      termsConditions: true,
      secAuth: true,
      returned: true
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

  openModal(index: number){
    console.log(index);
    this.isOpen = true;
    this.specific = this.areaLoans[index];
  }
  closeModal(){
    this.isOpen = false;
  }
  cancel(){
    this.isOpen = false;
  }
  returnDevice(){
    this.isOpen = false;
  }

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
    // periferals:32370
    var api = "http://169.51.205.229:30289/isLogged";
    var rout = this.router;
    axios.get(api, {withCredentials:true}).then(function (response) {
      if (response.status != 200) rout.navigate(['./home']);
    })
	}
	ngOnDestroy() {
	}

}
