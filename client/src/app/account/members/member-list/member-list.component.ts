import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IMember } from 'src/app/shared/_models/accountModels/member';
import { IPagination } from 'src/app/shared/_models/accountModels/pagination';
import { IUser } from 'src/app/shared/_models/accountModels/user';
import { UserParams } from 'src/app/shared/_models/accountModels/userParams';
import { AccountService } from 'src/app/account/_accountServices/account.service';
import { MembersService } from 'src/app/account/_accountServices/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members!: IMember[];
  pagination!: IPagination;
  userParams!: UserParams;
  user!: IUser;
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
