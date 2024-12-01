import { Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { TimeagoPipe } from '../../_pipes/timeago.pipe';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-messages',
  standalone: true,
  imports: [TimeagoPipe, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.scss'
})
export class MemberMessagesComponent implements OnInit{

  @ViewChild('messageForm') messageForm?: NgForm;
  
  @Input() username?: string; 
  @Input() messages: Message[] = [];

  private messageService: MessageService = inject(MessageService);
  messageContent = '';

  constructor(){}

  ngOnInit(): void {
  }

  sendMessage(){
    if(!this.username) return;

    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next: message => {
        this.messages.push(message);
        this.messageForm?.reset();
      }
    })
  }

}
