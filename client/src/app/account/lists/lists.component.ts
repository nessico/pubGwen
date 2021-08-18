import { Component, OnInit } from '@angular/core';
import { IMember } from '../../shared/_models/accountModels/member';
import { IPagination } from '../../shared/_models/accountModels/pagination';
import { MembersService } from '../_accountServices/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  members!: Partial<IMember[]>;
  predicate = 'liked';
  pageIndex = 1;
  pageSize = 6;
  pagination!: IPagination;

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes() {
    this.memberService
      .getLikes(this.predicate, this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.members = response.result;
        this.pagination = response.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageIndex = event.page;
    this.loadLikes();
  }
}
