import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { ButtonModule, CheckboxModule  } from 'carbon-components-angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-focal-loans',
  templateUrl: './focal-loans.component.html',
  styleUrls: ['./focal-loans.component.scss']
})
export class FocalLoansComponent implements OnInit {

  isOpen: boolean = false
  showCloseButton: boolean = true;
  userType: string = "";
  specific = {
    ID: 0,
      EMPLOYEE_NAME: "Name 1",
      SERIAL: "10007",
      CREATION: "DATE",
      CONDITION_ACCEPTED: false,
      SECURITY_AUTH: false
  };

  columns = [
    "Employee Name",
    "Serial Number",
    "Date",
    "Accepted Conditions",
    "Security Authorization"
  ];

  areaLoans = [
    {
      ID: 0,
      EMPLOYEE_NAME: "Name 1",
      SERIAL: "10007",
      CREATION: "DATE",
      CONDITION_ACCEPTED: false,
      SECURITY_AUTH: false
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
    var api = environment.ibm_users+"/isLogged";
    var rout = this.router;
    var esto = this;
    axios.get(api, {withCredentials:true}).then(function (response) {
      esto.userType = response.data.ROLE_NAME;
      api = environment.ibm_peripherals+"/Focal/getLoans";
      axios.get(api, { withCredentials: true }).then(res => {
        esto.areaLoans = res.data;
      }).catch(err => console.error(err));

    }).catch(err => {
      console.error(err);
      rout.navigate(['./']);
    });
	}
	ngOnDestroy() {
	}

}