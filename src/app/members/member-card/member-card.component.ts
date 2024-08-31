import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
}
