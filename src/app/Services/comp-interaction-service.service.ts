import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompInteractionServiceService {
  // Component interaction using "Services" between non-related(no Parent - child relationships) components
  // we will have to import "Subject" operator of Rxjs.

  // 1st way---
  // private _teacherMessageSource = new Subject<string>();
  // teacherMessage$ = this._teacherMessageSource.asObservable();

  // 2nd way---
  _teacherMessageSource = new BehaviorSubject<string>(
    'hello i am the first value'
  );

  // we need to make this source an Observable, then other component can subscribe these values.
  // for making any property(Source) into Observable we will use ".asObservable()" function.

  constructor() {}

  sendMessage(message: string) {
    console.log(message);

    // we will have to call ".next()" function for distributing the properties.
    this._teacherMessageSource.next(message);
  }
}
