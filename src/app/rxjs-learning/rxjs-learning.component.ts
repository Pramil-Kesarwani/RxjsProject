import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, fromEvent, interval, Observable, of } from 'rxjs';

@Component({
  selector: 'app-rxjs-learning',
  templateUrl: './rxjs-learning.component.html',
  styleUrls: ['./rxjs-learning.component.scss'],
})
export class RxjsLearningComponent implements OnInit {
  // creating a variable for Observable of type <string>
  agents!: Observable<string>;
  agentName: string = '';

  viewChildValue = 'Hello';

  // Example of 'of' operator-
  studentList = ['Ram', 'Mark', 'Sita', 'Shyam'];
  student: Observable<string[]> = of(this.studentList); // Observable of type Array of String

  studentNames: Observable<string> = of('RAM'); // Observable of type String

  studentObj = {
    id: 1,
    name: 'Shyam',
  };
  // usually we represents Observable with a "$" sign like "student$"
  student$: Observable<{}> = of(this.studentObj); // Observable of type Object

  // Example of 'from' Operator-
  ordersArr = ['Fashion', 'Electronics', 'Mobile', 'Household'];
  orders$: Observable<string> = from(this.ordersArr); // from Operator takes input as an 'Array' and return output as a 'String'. it will split the array elements.
  orderName: string = '';

  @ViewChild('validate')
  validate!: ElementRef;

  @ViewChild('getLink')
  getLinkData!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.agents = new Observable((observer) => {
      try {
        observer.next('Ram');
        setTimeout(() => {
          observer.next('Mark');
        }, 2000);
        setTimeout(() => {
          observer.next('Sita');
        }, 4000);
      } catch (e) {
        observer.error(e);
      }
    });

    this.agents.subscribe((data) => {
      console.log(data);
      this.agentName = data;
    });

    this.student.subscribe((data) => {
      console.log(data);
    });

    this.studentNames.subscribe((data) => {
      console.log(data);
    });

    this.student$.subscribe((data) => {
      console.log(data);
    });
    console.log('hello', this.student$); // it will give us : hello >observable // because we converted that value to observable, we will need to subscribe it.

    this.orders$.subscribe((data) => {
      console.log(data);
      this.orderName = data;
    });

  // interval Operator
    this.orders$.subscribe((data) => {
      const seqNum$ = interval(2000); // interval Operators returns a Observable.
      seqNum$.subscribe(num => {
        if (num < 5) {
          console.log(data + num);
          
        }
      })
    });

  }

  // fromEvent Operator in Angular Rxjs
  rxjsEventObservable() {
    console.log(this.validate.nativeElement.innerHTML);
    const btnObservable$ = fromEvent(this.validate?.nativeElement, 'click');
    btnObservable$.subscribe((data) => {
      console.log(data);
    });
    console.log(btnObservable$);
  }

  getEventObservable() {
    console.log(this.getLinkData.nativeElement);
    console.log(this.getLinkData.nativeElement.innerHTML);
    const linkObservable$ = fromEvent(this.getLinkData?.nativeElement, 'mouseover')
    linkObservable$.subscribe(data => {
      console.log(data);
      
    })
  }


  
}
