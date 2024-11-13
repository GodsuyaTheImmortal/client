import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, AsyncPipe],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss'
})
export class MemberListComponent implements OnInit{

  members$: Observable<Member[]> | undefined;
  private membersService: MembersService = inject(MembersService);

  ngOnInit(): void {
      this.members$ = this.membersService.getMembers();
  }


}
