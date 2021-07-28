import { PresenceService } from '../../_accountServices/presence.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/shared/_models/accountModels/member';
import { MembersService } from '../../_accountServices/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  @Input() member!: Member;
  constructor(
    private memberService: MembersService,
    private toastr: ToastrService,
    public presence: PresenceService
  ) {}

  ngOnInit(): void {}

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.displayName);
    });
  }
}