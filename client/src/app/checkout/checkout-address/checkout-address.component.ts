import { IAddress } from './../../shared/_models/accountModels/address';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/_accountServices/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss'],
})
export class CheckoutAddressComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  saveUserAddress() {
    this.accountService
      .updateUserAddress(this.checkoutForm.get('addressForm')!.value)
      .subscribe(
        (address: IAddress) => {
          this.toastr.success('Address saved');
          this.checkoutForm.get('addressForm')?.reset(address);
        },
        (error) => {
          this.toastr.error(error.message);
          console.log(error);
        }
      );
  }
}
