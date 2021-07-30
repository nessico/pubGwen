import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

  learnMore() {
    this.toastr.info(
      'Members and Account navigation updates based on your login',
      'Navigation:',
      {
        enableHtml: true,
      }
    );
  }
  learnUser() {
    this.toastr.info(
      'ada@test.com, Pa$$w0rd </br> or: </br> insertName@test.com, Pa$$w0rd',
      'Username, Password:',
      {
        enableHtml: true,
      }
    );
  }
  learnAdmin() {
    this.toastr.info('admin@test.com, Pa$$w0rd', 'Username, Password:', {
      enableHtml: true,
    });
  }
}
