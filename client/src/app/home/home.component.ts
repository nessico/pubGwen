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
    this.toastr.show(
      'Members and Account navigation options update based on your account type (member, mod, admin)',
      'Navigation:',
      {
        enableHtml: true,
      }
    );
  }
  learnUser() {
    this.toastr.show(
      'ada@test.com, Pa$$w0rd </br> or: </br> < seededUser >@test.com, Pa$$w0rd',
      'Username, Password:',
      {
        enableHtml: true,
      }
    );
  }
  learnAdmin() {
    this.toastr.show('admin@test.com, Pa$$w0rd', 'Username, Password:', {
      enableHtml: true,
    });
  }
}
