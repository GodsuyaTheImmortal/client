import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{

  members: Member[] = [];

  private membersService: MembersService = inject(MembersService);

  ngOnInit(): void {
      this.loadMembers();
  }

  loadMembers(){
    this.membersService.getMembers().subscribe({
      next: members => this.members = members
    })
  }
}
