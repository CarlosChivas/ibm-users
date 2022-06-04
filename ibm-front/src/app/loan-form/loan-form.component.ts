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
  openConfirmation: boolean = false;
  showCloseButton: boolean = true;
  userType: string = "";
  confModal = {
    title: "",
    body: ""
  }

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
  CloseAll() {
    this.isOpen = false;
    this.openConfirmation = false;
  }
  sendForm() {
    var esto = this;
    var mail = esto.loanForm.value.employeeMail.trim().toLowerCase();
    if (mail == "") mail = esto.user;
    var body = {
      employee_email: mail,
      peripheral_serial: esto.device.SERIAL
    };

    var api = environment.ibm_peripherals + "/AdminFocal/createLoan";
    axios.post(api, body, { withCredentials: true }).then(res => {

      console.log(res);
      esto.confModal.title = "Success";
      esto.confModal.body = "The loan was successfully processed.";
      esto.openConfirmation = true;

    }).catch(err => {
      console.error(err);
      esto.confModal.title = "Failed";
      esto.confModal.body = "The loan was not able to process correctly, please check that the employee's email is correct or try again later.";
      esto.openConfirmation = true;
    });

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
    var api = environment.ibm_users + "/isLogged";

    var rout = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then(function (response) {
      esto.userType = response.data.ROLE_NAME;
      var me = response.data;
      esto.user = me.EMAIL;

      var api2 = environment.ibm_peripherals + "/AdminFocal/getAvailablePeripherals";
      axios.get(api2, { withCredentials: true }).then(res => {
        esto.peripheralList = res.data;
      }).catch(err => console.error(err));

      var api3 = environment.ibm_peripherals + "/AdminFocal/getPeripheralFields";
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
