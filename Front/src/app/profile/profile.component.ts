import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
  }

}
