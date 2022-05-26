import { Component, OnInit,
	Input,
	EventEmitter,
	Output,
	ViewEncapsulation, } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-loan-confirmation',
  templateUrl: './loan-confirmation.component.html',
  styleUrls: ['./loan-confirmation.component.scss']
})
export class LoanConfirmationComponent implements OnInit {

  showClose: boolean = true
  lowContrast: boolean = false


  notificationConfig = {
    
		type: 'success',
    title: 'Device Confirmed',
    subtitle: '',
    caption: 'This is a confirmation for the device loan that you asked for.',
    lowContrast: this.lowContrast,
    showClose: this.showClose
  };

  Device = {
    "1": [{
      "device": "Mouse",
      "description": "HP mouse",
      "loanDate": "10-11-2022",
      "finishDate": ""
    }],
  };

  
  constructor(private router: Router) { }

  ngOnInit(): void {
    var api = "/isLogged";
    var rout = this.router;
    axios.get(api, {withCredentials:true}).then(function (response) {
      if (response.status != 200)
        rout.navigate(['./']);
    })
  }

}
