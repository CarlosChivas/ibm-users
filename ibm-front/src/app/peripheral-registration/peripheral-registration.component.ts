import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-peripheral-registration',
  templateUrl: './peripheral-registration.component.html',
  styleUrls: ['./peripheral-registration.component.scss']
})
export class PeripheralRegistrationComponent implements OnInit {

  fields = [
    { "name": "Divice Type", "id": "deviceType", "type": "text" },
    { "name": "Divice Brand", "id": "deviceBrand", "type": "text" },
    { "name": "Divice Model", "id": "deviceModel", "type": "text" },
    { "name": "Divice Description", "id": "deviceDesc", "type": "text" },
  ];

  diviceTypes: any[] = [];
  diviceBrands: any[] = [];
  me: any = {};

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

  sendForm() {
    var api = "http://localhost:4001/AdminFocal/createPeripheral";
    var rout = this.router;
    var esto = this;
    var form = esto.deviceForm.value;

    var body = {
      ptype: form.deviceType,
      description: form.deviceDesc,
      brand: form.deviceBrand,
      model: form.deviceModel
    };
    axios.post(api, body, { withCredentials: true }).then(response => {
      
      console.log(response)

    }).catch(err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    var api = "http://localhost:4000/isLogged";
    var rout = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then(function (response) {
      esto.me = response.data;
      var api3 = "http://localhost:4001/AdminFocal/getPeripheralFields";
      axios.get(api3, { withCredentials: true }).then(res => {
        esto.diviceTypes = res.data.ptype;
        esto.diviceBrands = res.data.brand;
      }).catch(err => console.log(err));

    }).catch(err => {
      console.log(err);
      rout.navigate(['./']);
    });
  }

}
