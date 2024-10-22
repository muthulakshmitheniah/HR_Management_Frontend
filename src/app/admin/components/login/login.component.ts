import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule,FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../service/admin-auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  adminLoginData = new FormGroup({
    username : new FormControl,
    password : new FormControl
  })

  constructor(private fb: FormBuilder,private adminAuth : AdminAuthService){}

  ngOnInit(): void {
      this.adminLoginData = this.fb.group({
        username : ['',[Validators.required,Validators.email]],
        password : ['',[Validators.required,Validators.minLength(5)]]
      });
  }

  adminLogin(){
    this.adminAuth.adminLogin(this.adminLoginData.value.username, this.adminLoginData.value.password);
  }
}
