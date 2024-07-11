import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private reloadSource = new BehaviorSubject<boolean>(false);
  reload$ = this.reloadSource.asObservable();

  triggerReload() {
    this.reloadSource.next(true);
  }
}
