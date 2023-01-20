import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent implements OnInit {


  public form: FormGroup
  public busy = false;

  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder

  ) {
    this.form = this.fb.group({
      document: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])]
    })
   }

  ngOnInit(): void {

  }
  
  submit() {
    this.busy = true;
    this 
    .service
    .resetPassword(this.form.value)
    .subscribe(
      (data: any) => {
        this.busy
        this.router.navigate(['/login']);
      },
      (err: any) => {
        console.log(err);
        this.busy = false;
      }
    )
  }
}
