import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserApi } from "src/app/apis/user-api";
import { LoginResponse } from 'src/app/models/user';
import { AlertModalComponent } from 'src/app/modules/shared/components/alert-modal/alert-modal.component';
import { AppService } from 'src/app/services/app.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private userApi: UserApi,
    private appService: AppService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.userApi.login(this.loginForm.value.userName)
        .pipe(
          catchError(error => {
            const modalRef = this.modalService.open(AlertModalComponent, { centered: true });
            modalRef.componentInstance.heading = "Error";
            modalRef.componentInstance.message = `Please enter valid username and password`;
            return throwError(error);
          })
        )
        .subscribe((data: LoginResponse) => {
          if (data && typeof (data) === "object" && data.userDetails && data.userDetails.length) {
            const userDetail = data.userDetails[0];
            this.appService.saveLoginUserDetail(userDetail);
            this.router.navigate(['/LandingPage'])
          }
        })
    } else {
      alert("Please enter username and password");
    }

  }

}
