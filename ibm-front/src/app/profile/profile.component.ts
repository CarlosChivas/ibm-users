import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  Profile = {
    "1": [{
      "name": "Erick Calderon",
      "email" : "ericksito@gmail.com",
      "telephone" : "44732423948",
      "slack": "erickin17",
      "department" : "Device Loans",
      "role" : "Administrator"
    }],
  };

  title = 'My Loans'

  myLoans = {
    "Current": [{
      "device": "Keyboard",
      "description": "DELL keyboard"
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard"
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard"
    }, {
      "device": "Keyboard",
      "description": "DELL keyboard"
    }],
    "In process": [{
      "device": "Mouse",
      "description": "HP mouse"
    }, {
      "device": "Mouse",
      "description": "HP mouse"
    }],
    "Past": [{
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
    }],
  };
  constructor(private router: Router) { }

  ngOnInit(): void {
    var api = "http://169.51.205.229:30289/isLogged";
    var rout = this.router;
    axios.get(api, {withCredentials:true}).then(function (response) {
      if (response.status != 200)
        rout.navigate(['./']);
    })
  }

}
