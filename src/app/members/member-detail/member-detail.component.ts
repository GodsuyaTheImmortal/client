import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { CommonModule, DatePipe } from '@angular/common';
import { TimeagoPipe } from '../../_pipes/timeago.pipe';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../_models/message';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule, CommonModule, DatePipe, TimeagoPipe, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnInit{
  
  @ViewChild('memberTabs', {static: true}) memberTabs?: TabsetComponent;

  member: Member = {} as Member;
  images: GalleryItem[] = [];
  messages: Message[] = [];
  activeTab?: TabDirective;

  private messageService: MessageService = inject(MessageService);
  private router: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
      this.router.data.subscribe({
        next: data => this.member = data['member']
      })

      this.router.queryParams.subscribe({
        next: params => {
          params['tab'] && this.selectTab(params['tab'])
        }
      })

      this.getImages()
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages'){
      this.loadMessages();
    }
  }

  loadMessages(){
    if(this.member){
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
    }
  }

  selectTab(heading: string){
    if(this.memberTabs){
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }

  getImages(){
    if(!this.member) return;

    for(const photo of this.member.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }
}
