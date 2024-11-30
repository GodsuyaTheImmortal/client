import { Component, inject, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { MembersService } from '../../_services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  @Input() member: Member | undefined;

  private memberService: MembersService = inject(MembersService);
  private toastr: ToastrService = inject(ToastrService);

  addLike(member: Member){
    this.memberService.addLike(member.userName).subscribe({
      next: () => this.toastr.success('You have liked ' + member.knownAs)
    })
  }
}
