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
    {"name":"Emploee Email","id":"emploeeEmail", "type":"email"},
    {"name":"Focal Email","id":"focalEmail", "type":"email"},
    {"name":"Divice Type","id":"diviceType", "type":"text"},
    {"name":"Divice Brand","id":"diviceBrand", "type":"text"},
    {"name":"Divice Model","id":"diviceModel", "type":"text"},
    {"name":"Device Serian Number","id":"deviceID", "type":"text"}];

    diviceTypes = ["Headphones","Keyboard","Monitor","Mouse"];
    diviceBrands = [];
    diviceModels = [];
  loanForm = this.formBuilder.group({
    emploeeID: '',
    emploeeEmail: '',
    emploeeName: '',
    emploeeLastName: '',
    detartment: '',
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
  ngOnInit(): void {
    var api = "http://169.51.205.229:30289/isLogged";
    var rout = this.router;
    axios.get(api, {withCredentials:true}).then(function (response) {
      if (response.status != 200)
        rout.navigate(['./']);
    })
  }

}
