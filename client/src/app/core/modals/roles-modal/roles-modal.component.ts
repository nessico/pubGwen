import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IUser } from 'src/app/shared/_models/accountModels/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss'],
})
export class RolesModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter();
  user!: IUser;
  roles!: any[];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }
}
