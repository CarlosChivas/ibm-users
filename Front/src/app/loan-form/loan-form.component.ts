import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {
  fields = [
    {"name":"emploeeEmail", "type":"email"},
    {"name":"detartment", "type":"text"},
    {"name":"focalEmail", "type":"email"},
    {"name":"deviceID", "type":"text"}];

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
    private formBuilder: FormBuilder
  ) {
  }

  sendForm() {
    console.log(this.loanForm.value)
  }

  ngOnInit(): void {
  }

}
