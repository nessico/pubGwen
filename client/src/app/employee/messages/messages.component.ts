import { Component, OnInit } from '@angular/core';
import { Message } from '../../shared/_models/employeeModels/message';
import { Pagination } from '../../shared/_models/employeeModels/pagination';
import { ConfirmService } from '../employeeServices/confirm.service';
import { MessageService } from '../employeeServices/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  pagination!: Pagination;
  container = 'Unread';
  pageNumber = 1;
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
      .getMessages(this.pageNumber, this.pageSize, this.container)
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
    this.pageNumber = event.page;
    this.loadMessages();
  }
}
