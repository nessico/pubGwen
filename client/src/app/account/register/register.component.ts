import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_accountServices/account.service';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  FormArray,
  AsyncValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';

import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  maxDate!: Date;
  minDate!: Date;
  validationErrors: string[] = [];
  bsConfig: Partial<BsDatepickerConfig> = {
    containerClass: 'theme-dark-blue',
    isAnimated: true,
    dateInputFormat: 'YYYY-MM-DD',
  };

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 100);
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
          ],
          [this.validateEmailNotTaken()],
        ],
        username: ['', [Validators.required], [this.validateUserNotTaken()]],
        displayName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(8),
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{1,}'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.validateMatchPass }
    );
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/shop');
      },
      (error) => {
        this.validationErrors = error;
      }
    );
  }

  private validateMatchPass(formGroup: FormGroup): ValidationErrors | null {
    return formGroup.get('password')?.value ===
      formGroup.get('confirmPassword')?.value
      ? null
      : { isMatching: true };
  }
  //return inner observable to the outer observable(control) with switchMap
  validateEmailNotTaken(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map((res) => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }

  validateUserNotTaken(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkUserExists(control.value).pipe(
            map((res) => {
              return res ? { userExists: true } : null;
            })
          );
        })
      );
    };
  }
}
