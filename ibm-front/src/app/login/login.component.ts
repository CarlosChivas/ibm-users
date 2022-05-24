import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    console.log("Entro aqui");
    var api = "http://169.51.205.229:30289/isLogged";
    var rout = this.router;
    axios.get(api, { withCredentials: true }).then(function (response) {
      console.log("Respuesta -> ", response);
      if (response.status == 200)
        rout.navigate(['./home']);
    })
  }

  validateLogin() {
    var api = "http://169.51.205.229:30289/login";
    var rout = this.router;
    var form = this.LoginForm;
    console.log(form.value);
    if (form.value.email.trim() == "") return;
    if (form.value.password == "") return;

    axios.post(api, {
      email: form.value.email,
      password: form.value.password,
    }, { withCredentials: true }).then(function (response) {
      console.log(response);
      if (response.status == 200)
        rout.navigate(['./home']);
    })

  }

  ngOnInit(): void {
    console.log("Entro aqui");
    var api = "http://169.51.205.229:30289/isLogged";
    var rout = this.router;
    axios.get(api, { withCredentials: true }).then(function (response) {
      console.log("Respuesta -> ", response);
      if (response.status == 200)
        rout.navigate(['./home']);
    })
  }

}
