import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CheckboxModule, ModalModule } from 'carbon-components-angular';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {
  
  open: boolean = false
  showCloseButton: boolean = true;

  fields = [
    {"name":"employeeEmail", "type":"email"},
    {"name":"department", "type":"text"},
    {"name":"focalEmail", "type":"email"},
    {"name":"deviceID", "type":"text"}];

  loanForm = this.formBuilder.group({
    employeeID: '',
    employeeEmail: '',
    employeeName: '',
    employeeLastName: '',
    department: '',
    focalID: '',
    focalEmail: '',
    focalName: '',
    focalLastName: '',
    deviceID: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  sendForm() {
    console.log(this.loanForm.value)
  }
  peripheralList = [{
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
    }];

	deviceTypeFilters = [];
	radioFilter = null;

	deviceType = [
		{ value: "Monitor", checked: false},
		{ value: "Keyboard", checked: false},
		{ value: "Mouse", checked: false}
	];

  radios = [
		{ color: "Accepted Conditions", checked: false },
		{ color: "Security Authorization", checked: false },
		{ color: "Returned", checked: false }
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
        rout.navigate(['./']);
    })
	}
	ngOnDestroy() {
	}
}
