import { ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IMessage } from 'src/app/shared/_models/accountModels/message';
import { MembersService } from 'src/app/account/_accountServices/members.service';
import { MessageService } from 'src/app/account/_accountServices/message.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss'],
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm!: NgForm;
  @Input() username!: string;
  @Input() messages!: IMessage[];
  messageContent!: string;
  loading = false;

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {}

  sendMessage() {
    this.loading = true;
    this.messageService
      .sendMessage(this.username, this.messageContent)
      .then(() => {
        this.messageForm.reset();
      })
      .finally(() => (this.loading = false));
  }
}
