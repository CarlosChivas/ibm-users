import { Component, OnInit } from '@angular/core';
import { ButtonModule, CheckboxModule } from 'carbon-components-angular';
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
    }, {
      ID: 2,
      "FIRST_NAME": "Ernesto",
      "LAST_NAME": "Alvarez",
      "EMAIL": "NetoAlv@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Focal"
    }, {
      "ID": 3,
      "FIRST_NAME": "Samuel",
      "LAST_NAME": "Diaz",
      "EMAIL": "SamuelDiaz@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Security"
    },
    {
      ID: 4,
      FIRST_NAME: "Erick",
      LAST_NAME: "Calderon",
      EMAIL: "ErickCalderon@ibm.com",
      DEPARTMENT_NAME: "IBM",
      "ROLE_NAME": "Employee"
    }, {
      "ID": 5,
      "FIRST_NAME": "Nicole",
      "LAST_NAME": "Copado",
      "EMAIL": "NicoleCopado@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Focal"
    }, {
      "ID": 6,
      "FIRST_NAME": "Eduardo",
      "LAST_NAME": "Esteva",
      "EMAIL": "EduardoEsteva@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Focal"
    }, {
      "ID": 7,
      "FIRST_NAME": "Carlos",
      "LAST_NAME": "Brito",
      "EMAIL": "CarlosBrito@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Administrator"
    }, {
      "ID": 8,
      "FIRST_NAME": "Keneth",
      "LAST_NAME": "Bauer",
      "EMAIL": "KenBauer@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Security"
    }, {
      "ID": 9,
      "FIRST_NAME": "Ivan",
      "LAST_NAME": "Wilebaldo",
      "EMAIL": "IvanWilebaldo@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Administrator"
    }, {
      "ID": 10,
      "FIRST_NAME": "Salvador",
      "LAST_NAME": "Hinojosa",
      "EMAIL": "SalvadorHinojosa@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Security"
    }, {
      "ID": 11,
      "FIRST_NAME": "Gabriel",
      "LAST_NAME": "Briones",
      "EMAIL": "GabrielBriones@ibm.com",
      "DEPARTMENT_NAME": "IBM",
      "ROLE_NAME": "Security"
    }
  ];

  constructor(private router: Router) { }

  deviceTypeFilters = [];

  deviceType = [
    { value: "Admin", checked: false },
    { value: "Focal Point", checked: false },
    { value: "Security", checked: false }
  ];

   updateRole(changes: Object, index: number) {
     // @ts-ignore
    console.log(index,changes.item);
    // @ts-ignore
    this.employees[index].ROLE_NAME = changes.item.content;
    // TODO: Actualizar con la API
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
    var api = "/isLogged";
    var rout = this.router;
    var esto = this;
    axios.get(api, { withCredentials: true }).then((response) => {
      if (response.status != 200) rout.navigate(['./']);
      else {
        if (response.data.ROLE_NAME != "Administrator") rout.navigate(['./']);
        console.log(response.data);
        api = "/Admin/getAllUsers";
        axios.get(api, { withCredentials: true }).then(function (response) {
          console.log(response.data);
          esto.employees = response.data;
        });
      }
    }).catch((error) => {
      rout.navigate(['./']);
    });
  }
  ngOnDestroy() {
  }

}

