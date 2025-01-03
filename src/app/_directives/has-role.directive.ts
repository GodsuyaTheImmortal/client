import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit{

  @Input() appHasRole: string[] = [];
  user: User = {} as User;

  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private templateRef: TemplateRef<any> = inject(TemplateRef<any>);
  private accountService: AccountService = inject(AccountService);

  constructor() { 
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
      }
    })
  }

  ngOnInit(): void {
    if(this.user.roles.some(r => this.appHasRole.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      this.viewContainerRef.clear;
    }
  }

}
