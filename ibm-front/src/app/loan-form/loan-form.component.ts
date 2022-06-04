import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CheckboxModule, ModalModule } from 'carbon-components-angular';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {

  isOpen: boolean = false
  showCloseButton: boolean = true;
  userType: string = "";

  fields = { "name": "employeeEmail", "type": "email" };
  device = {
    SERIAL: 0,
    BRAND: "",
    PTYPE: "",
    MODEL: "",
    DESCRIPTION: "",
    PERIPHERAL_STATUS: "",

    DEPARTMENT_NAME: "",
    FOCAL_NAME: ""
  };
  user = "";

  loanForm = this.formBuilder.group({
    employeeMail: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  openModal(index: number) {
    this.isOpen = true;
    this.device = this.peripheralList[index];
  }
  closeModal() {
    this.isOpen = false;
  }
  sendForm() {
    var esto = this;
    var mail = esto.loanForm.value.employeeMail.trim().toLowerCase();
    if (mail == "") mail = esto.user;
    var body = {
      employee_email: mail,
      peripheral_serial: esto.device.SERIAL
    };
    /*
    var api = environment.ibm_users+"/AdminFocal/searchUsers/name="+body.employee_email.trim().toLowerCase();
    axios.get(api, { withCredentials: true }).then(response => {
      console.log(response);
      /*/
    var api = environment.ibm_peripherals+"/AdminFocal/createLoan";
    axios.post(api, body, { withCredentials: true }).then(res => {
      console.log(res);
    }).catch(err => console.log(err));
    /* // /
  }).catch(err => console.log(err));
  */

  }
  peripheralList = [{
    SERIAL: 0,
    BRAND: "",
    PTYPE: "keyboard",
    MODEL: "",
    DESCRIPTION: "",
    PERIPHERAL_STATUS: "",

    DEPARTMENT_NAME: "",
    FOCAL_NAME: ""
  }];

  deviceTypeFilters = [];
  deviceBrandFilters = [];

  deviceType: { value: any; checked: boolean }[] = [];
  deviceBrands: { value: any; checked: boolean }[] = [];

  onCheckboxChange() {
  }

  onRadioChange() {
  }

  resetFilters() {
    this.resetTypes();
    this.resetBrands();
  }

  resetTypes() {
    this.deviceTypeFilters = [];
    this.deviceType = this.deviceType.map(obj => ({ value: obj.value, checked: false }));
    this.applyFilters();
  }
  resetBrands() {
    this.deviceBrandFilters = [];
    this.deviceBrands = this.deviceBrands.map(obj => ({ value: obj.value, checked: false }));
    this.applyFilters();
  }

  applyFilters() {
  }

  ngOnInit() {
    var api = "http://localhost:4000/isLogged";

    var rout = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then(function (response) {
      esto.userType = response.data.ROLE_NAME;
      var me = response.data;
      esto.user = me.EMAIL;

      var api2 = "http://localhost:4001/AdminFocal/getAvailablePeripherals";
      axios.get(api2, { withCredentials: true }).then(res => {
        esto.peripheralList = res.data;
      }).catch(err => console.log(err));
      
      var api3 = "http://localhost:4001/AdminFocal/getPeripheralFields";
      axios.get(api3, { withCredentials: true }).then(res => {
        res.data.ptype.forEach((element: { NAME: any; }) => {
          esto.deviceType.push({
            value: element.NAME,
            checked: false
          });
        });
        res.data.brand.forEach((element: { NAME: any; }) => {
          esto.deviceBrands.push({
            value: element.NAME,
            checked: false
          });
        });
      }).catch(err => console.log(err));

    }).catch(err => {
      console.log(err);
      rout.navigate(['./']);
    });
  }
  ngOnDestroy() {
  }
}
