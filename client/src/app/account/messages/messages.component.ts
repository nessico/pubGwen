import { Component, OnInit } from '@angular/core';
import { IMessage } from '../../shared/_models/accountModels/message';
import { IPagination } from '../../shared/_models/accountModels/pagination';
import { ConfirmService } from '../_accountServices/confirm.service';
import { MessageService } from '../_accountServices/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: IMessage[] = [];
  pagination!: IPagination;
  container = 'Unread';
  pageIndex = 1;
  pageSize = 100;
  loading = false;
  constructor(
    private messageService: MessageService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService
      .getMessages(this.pageIndex, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      });
  }

  deleteMessage(id: number) {
    this.confirmService
      .confirm('Confirm delete message', 'This cannot be undone')
      .subscribe((result: any) => {
        if (result) {
          this.messageService.deleteMessage(id).subscribe(() => {
            this.messages.splice(
              this.messages.findIndex((m) => m.id === id),
              1
            );
          });
        }
      });
  }

  pageChanged(event: any) {
    this.pageIndex = event.page;
    this.loadMessages();
  }
}
