import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';
import { sAuth } from '../../services/sAuth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/iUser';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  @ViewChild('menu', { static: true }) sideMenu?: ElementRef;
  public form: FormGroup = this.buildForm();
  public userData!: User;

  constructor (
    private fb: FormBuilder,
    public router: Router,
    private sAuth: sAuth
  ) {}

  ngOnInit(): void {
    this.sAuth.getUserData().subscribe({
      next: (userData) => {
        this.userData = userData,
        this.form = this.buildForm();
      },
      error: (error) => console.error(error)
    });
  }

  public onLogout(): void {
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  public getUser(): void {
    this.sAuth.getUser().subscribe({
      next: (res) => {
        this.userData = res.data,
        this.form = this.buildForm();
      },
      error: (error) => console.error(error)
    });
  }

  public buildForm() {
    return this.fb.group({
      id: ['', []],
      name: [this.userData ? this.userData.name : '' , [Validators.required, Validators.maxLength(15)]],
      nickname: [this.userData ? this.userData.nickname : '', [Validators.required, Validators.minLength(4)]],
      email: [this.userData ? this.userData.email : '', [Validators.required, Validators.email]]
    });
  }
}
