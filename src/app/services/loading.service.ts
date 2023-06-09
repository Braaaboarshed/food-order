import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
private isLoadingSubject = new BehaviorSubject<boolean>(false)
  constructor() { }

  showLoading(){
    this.isLoadingSubject.next(true)
  }

  hideLoading(){
  this.isLoadingSubject.next(false)
  }
  get isLoading(){
    // to make the subject only read
    return this.isLoadingSubject.asObservable()
  }
}
