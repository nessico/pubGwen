import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  BsModalRef!: BsModalRef;

  constructor(private modalService: BsModalService) {}

  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkText = 'Ok',
    btnCancelText = 'Cancel'
  ): Observable<boolean> {
    const config = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText,
      },
    };
    this.BsModalRef = this.modalService.show(ConfirmDialogComponent, config);

    return new Observable<boolean>(this.getResult());
  }

  //subscribing to an observable
  private getResult() {
    return (observer: any) => {
      const subscription = this.BsModalRef.onHidden.subscribe(() => {
        observer.next(this.BsModalRef.content.result);
        observer.complete();
      });
      return {
        unsubscribe() {
          subscription.unsubscribe();
        },
      };
    };
  }
}
