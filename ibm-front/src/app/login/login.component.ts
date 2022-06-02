import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../environments/environment';

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
  ) { }

  validateLogin(): boolean | undefined {

    var api = environment.ibm_users+"/login";
    var rout = this.router;
    var form = this.LoginForm;
    console.log(form.value);
    if (form.value.email.trim() == "") return false;
    if (form.value.password == "") return false;

    var body = {
      email: form.value.email,
      password: form.value.password,
    };

    axios.post(api, body, { withCredentials: true }).then(function (response) {
      console.log(response);
      if (response.status == 200)
        rout.navigate(['./home']);
    }).catch(err => {
      console.log("Aver -> ", err);
    });
    return false;
  }

  ngOnInit(): void {
    var api = "http://localhost:4000/isLogged";
    var rout = this.router;
    axios.get(api, { withCredentials: true }).then(function (response) {
      console.log("Respuesta -> ", response);
      if (response.status == 200)
        rout.navigate(['./home']);
    }).catch(err => {
      console.log("Not Logged: ", err);
    });
  }

}
