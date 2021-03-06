import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { IUser } from '../../shared/_models/accountModels/user';
import { AccountService } from '../../account/_accountServices/account.service';

@Directive({
  selector: '[appHasRole]', // *appHasRole='["Admin"]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole!: string[];
  user!: IUser;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    // Clear view if no roles
    // If user has a role, create embedded view and then use admin link as template
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    // Apply callback function on each element inside user roles
    if (this.user?.roles.some((r) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
