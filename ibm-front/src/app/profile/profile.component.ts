import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

@Injectable()
export class ProfileComponent implements OnInit {

  profile = {
    ID: 1,
    FIRST_NAME: "FirstName",
    LAST_NAME: "LastName",
    EMAIL: "example@ibm.com",
    DEPARTMENT_NAME: "IBM",
    ROLE_NAME: "ROLE"
  }

  title = 'My Loans'
  showLoans = false;

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
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var api = "http://localhost:4000/isLogged";
    var rout = this.route;
    var router = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then((response) => {
      if (response.status == 200) {
        var me = response.data;
        var myParam = rout.snapshot.paramMap.get('id');
        console.log(myParam);
        console.log(me);
        if (myParam != me.ID && (me.ROLE_NAME == "Administrator" || me.ROLE_NAME == "Focal")) {
          var api = "http://localhost:4000/AdminFocal/getUser/id=" + myParam;
          axios.get(api, { withCredentials: true }).then(res => {
            console.log(res.data);
            esto.profile = res.data;
            esto.showLoans = true;
          }).catch(e=>console.log(e));
        }
        else {
          esto.profile = me;
          esto.showLoans = false;
        }
      }
    }).catch(err => {
      console.log(err);
      router.navigate(['./']);
    });
  }

}
