import { BreadcrumbService } from 'xng-breadcrumb';
import { PresenceService } from '../../_accountServices/presence.service';
import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/shared/_models/accountModels/member';
import { Message } from 'src/app/shared/_models/accountModels/message';
import { MembersService } from 'src/app/account/_accountServices/members.service';
import { MessageService } from 'src/app/account/_accountServices/message.service';
import { AccountService } from 'src/app/account/_accountServices/account.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/_models/accountModels/user';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('memberTabs', { static: true }) memberTabs!: TabsetComponent;
  member!: Member;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  activeTab!: TabDirective;
  messages: Message[] = [];
  user!: User;

  constructor(
    public presence: PresenceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router,
    private memberService: MembersService,
    private toastr: ToastrService,
    private bcService: BreadcrumbService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });

    this.bcService.set('@memberDetails', '');
  }

  ngOnInit(): void {
    //guaranteeing route will have member in it
    this.route.data.subscribe((data) => {
      this.member = data.member;
      this.bcService.set('@memberDetails', this.member.displayName);
    });

    this.route.queryParams.subscribe((params) => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }

  loadMessages() {
    this.messageService
      .getMessageThread(this.member.username)
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.messageService.createHubConnection(this.user, this.member.username);
    } else {
      this.messageService.stopHubConnection();
    }
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.displayName);
    });
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
}
