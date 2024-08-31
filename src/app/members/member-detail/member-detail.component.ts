import { Component, OnInit, inject } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.scss'
})
export class MemberDetailComponent implements OnInit{

  member: Member | undefined;
  images: GalleryItem[] = [];
  
  memberService: MembersService = inject(MembersService);
  router: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
      this.loadMember();
  }

  loadMember(){
    const username = this.router.snapshot.paramMap.get('username');

    if(!username) return;

    this.memberService.getMember(username).subscribe({
      next: member =>  {
        this.member = member,
        this.getImages()
      }
    })
  }

  getImages(){
    if(!this.member) return;

    for(const photo of this.member.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));
    }
  }
}
