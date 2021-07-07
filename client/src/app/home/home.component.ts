import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  learnMore() {
    this.toastr.info('Ada, Pa$$w0rd </br> Admin, adminPa$$w0rd', 'Try:', {
      enableHtml: true,
    });
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
