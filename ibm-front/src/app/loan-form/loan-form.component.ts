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

  isOpen: boolean = false
  showCloseButton: boolean = true;

  fields = { "name": "employeeEmail", "type": "email" };
  device = {
    BRAND: "No brand",
    TYPE: "No Type",
    SN: "N/A",
    DESCRIPTION: "No Brand - No Type"
  };
  user = {
    ROLE: "",
    EMAIL: "",
  };

  loanForm = this.formBuilder.group({
    employeeMail: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  openModal(index: number) {
    console.log(index);
    this.isOpen = true;
    this.device = this.peripheralList[index];
  }
  closeModal() {
    this.isOpen = false;
  }
  sendForm() {
    console.log(this.loanForm.value)
    console.log(this.user)
  }
  peripheralList = [{
    BRAND: "ACER",
    TYPE: "MONITOR",
    SN: "10",
    DESCRIPTION: "ACER - Monitor"
  }, {
    BRAND: "DELL",
    TYPE: "KEYBOARD",
    SN: "20",
    DESCRIPTION: "DELL - Keyboard"
  }, {
    BRAND: "BOSE",
    TYPE: "SPEAKER",
    SN: "30",
    DESCRIPTION: "BOSE - Speaker"
  }, {
    BRAND: "SONY",
    TYPE: "HEADPHONES",
    SN: "40",
    DESCRIPTION: "SONY - Headphones"
  }, {
    BRAND: "HP",
    TYPE: "MOUSE",
    SN: "50",
    DESCRIPTION: "HP - Mouse"
  }, {
    BRAND: "BLUE YETI",
    TYPE: "MICROPHONE",
    SN: "60",
    DESCRIPTION: "Blue Yeti - Microphone"
  }, {
    BRAND: "KINGSTONE",
    TYPE: "HARD DRIVE",
    SN: "70",
    DESCRIPTION: "Kingstone - Hard Drive"
  }, {
    BRAND: "LOGITECH",
    TYPE: "WEB CAM",
    SN: "80",
    DESCRIPTION: "LOGITECH - Web Cam"
  }, {
    BRAND: "APPLE",
    TYPE: "TRACK PAD",
    SN: "90",
    DESCRIPTION: "APPLE - TRACK PAD"
  }, {
    BRAND: "TP-LINK",
    TYPE: "ROUTER",
    SN: "100",
    DESCRIPTION: "TP-LINK - ROUTER"
  }];

  deviceTypeFilters = [];
  radioFilter = null;

  deviceType = [
    { value: "Monitor", checked: false },
    { value: "Keyboard", checked: false },
    { value: "Mouse", checked: false }
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
    var api = "http://169.51.205.229:30289/isLogged";
    var rout = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then(function (response) {
      if (response.status != 200)
        rout.navigate(['./']);
        else{
          console.log(response.data);
          esto.user.EMAIL = response.data.EMAIL;
          esto.user.ROLE = response.data.ROLE_NAME;
        }
    })
  }
  ngOnDestroy() {
  }
}
