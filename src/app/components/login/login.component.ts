import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.loginForm.value)
  }

}
