import { Component, OnInit } from '@angular/core';
import { ButtonModule, CheckboxModule } from 'carbon-components-angular';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})



export class RoleManagementComponent implements OnInit {
  searchText: any;
  nameSearch: string = ''



  columns = ["Emploee ID",
    "First Name",
    "Last Name",
    "Email",
    "Department",
    "Role"
  ];

  roles = [{
    content: "Administrator",
    selected: false
  }, {
    content: "Focal",
    selected: false
  }, {
    content: "Security",
    selected: false
  }, {
    content: "Employee",
    selected: false
  }];

  employees = [
    {
      ID: 1,
      "FIRST_NAME": "Carlos",
      "LAST_NAME": "Estrada",
      "EMAIL": "CarlosEstrada@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Administrator"
    }
  ];

  constructor(private router: Router, private formBuilder: FormBuilder,) { }

  deviceTypeFilters = [];

  deviceType = [
    { value: "Admin", checked: false },
    { value: "Focal Point", checked: false },
    { value: "Security", checked: false }
  ];

  updateRole(changes: Object, index: number) {
    // @ts-ignore
    console.log(index, changes.item);
    // @ts-ignore
    this.employees[index].ROLE_NAME = changes.item.content;
    // TODO: Actualizar con la API
  }

  checkPin($event: KeyboardEvent) {
    if (event) {
      // @ts-ignore
      if (event.keyCode == 13) {
        let value = (<HTMLInputElement>event.target).value;
        var rout = this.router;
        var esto = this;
        var api = "http://localhost:4000/AdminFocal/searchUsers";
        var body = {
          text: value.trim,

        };
        axios.get(api, { withCredentials: true }).then((response) => {
          if (response.status == 200) {
            esto.employees = response.data;
          }
        });
      }
    }
  }


  onCheckboxChange() {
  }

  onRadioChange() {
  }

  resetFilters() {
    this.resetCheckboxList();
  }

  resetCheckboxList() {
    this.deviceTypeFilters = [];
    this.deviceType = this.deviceType.map(obj => ({ value: obj.value, checked: false }));
    this.applyFilters();
  }

  applyFilters() {
  }

  ngOnInit() {
    var api = "http://localhost:4000/isLogged";
    var rout = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then((response) => {
      if (response.status != 200) rout.navigate(['./']);
      else {
        if (response.data.ROLE_NAME != "Administrator") rout.navigate(['./']);
        console.log(response.data);
        api = "http://localhost:4000/Admin/getAllUsers";
        axios.get(api, { withCredentials: true }).then(function (response) {
          console.log(response.data);
          esto.employees = response.data;
        });
      }
    }).catch(err => {
      console.log(err);
      rout.navigate(['./']);
    });
  }
  ngOnDestroy() {
  }

}

