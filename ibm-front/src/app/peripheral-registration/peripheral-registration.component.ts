import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-peripheral-registration',
  templateUrl: './peripheral-registration.component.html',
  styleUrls: ['./peripheral-registration.component.scss']
})
export class PeripheralRegistrationComponent implements OnInit {

  

  diviceTypes: any[] = [];
  diviceBrands: any[] = [];
  me: any = {};
  userType: string = "";

  deviceForm = this.formBuilder.group({
    deviceType: '',
    deviceBrand: '',
    deviceModel: '',
    deviceDesc: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  updateType(changes: Object) {
    console.log("jajas");
  }
  updateBrand(changes: Object) {
    console.log("jujus");
  }

  sendForm() {
    var api = environment.ibm_peripherals+"/AdminFocal/createPeripheral";
    var rout = this.router;
    var esto = this;
    var form = esto.deviceForm.value;

    var body = {
      ptype: form.deviceType.content,
      description: form.deviceDesc,
      brand: form.deviceBrand.content,
      model: form.deviceModel
    };
    console.log(form);
    axios.post(api, body, { withCredentials: true }).then(response => {
      
      console.log(response)

    }).catch(err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    var api = environment.ibm_users+"/isLogged";
    var rout = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then(function (response) {
      esto.userType = response.data.ROLE_NAME;
      esto.me = response.data;
      var api3 = environment.ibm_peripherals+"/AdminFocal/getPeripheralFields";
      axios.get(api3, { withCredentials: true }).then(res => {

        esto.diviceTypes = res.data.ptype.map((element: any) => Object({content: element.NAME, selected: false}));
        esto.diviceBrands = res.data.brand.map((element: any) => Object({content: element.NAME, selected: false}));

        console.log(esto.diviceTypes);
        console.log(esto.diviceBrands);

      }).catch(err => console.log(err));

    }).catch(err => {
      console.log(err);
      rout.navigate(['./']);
    });
  }

}
