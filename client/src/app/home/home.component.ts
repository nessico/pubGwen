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
    this.toastr.info('Ada, Pa$$w0rd </br> Admin, adminPa$$w0rd', 'Try:', {
      enableHtml: true,
    });
  }


}
