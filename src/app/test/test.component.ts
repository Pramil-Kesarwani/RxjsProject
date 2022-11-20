import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CompInteractionServiceService } from '../Services/comp-interaction-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit, AfterViewInit, OnChanges {
  hasError = true;
  isSpecial = true;

  highlightColor = 'orange';

  greeting = '';

  parentChildInteractionInChild = 'connecting the dots';

  // Component interaction using "Services" between non-related(no Parent - child relationships) components
  constructor(private _compInteractionService: CompInteractionServiceService) {}

  ngOnInit(): void {

    // 1st way---(using Subject)
    // this._compInteractionService.teacherMessage$.subscribe((message) => {
    //   this.greeting = message;
    // })

    // 2nd way--- (using BehaviourSubject)
    this._compInteractionService._teacherMessageSource.subscribe((message) => {
      // alert(message);
      this.greeting = message;
    });
  }

  // Component interaction using @Output Decorator for accessing the properties of parent component class from child Components---

  @Output()
  greetEvent = new EventEmitter();
  name1 = 'Anvika calling from child component to parent component';

  callParentGreet() {
    // alert('called this method from child Component template to child componet class')
    this.greetEvent.emit(this.name1);
  }

  // component interaction (we can use these property only in parent component template not in classes) using Template Reference Variable # ---
  anviName = 'Anvika Kesarwani';
  greetAnvi() {
    alert('Hey Anvi');
  }

  // using Getters and Setters we can apply any logic based on the value which are coming from the parent Component.
  // 1st approach to intercept @Input property - using getters and setters.
  // 2nd approach is using 'OnChanges' lifeCycle hooks - 'ngOnChanges()' methods.

  // 1st Approach using getters and setters---
  // private _loggedIn!: boolean;
  // message: string = '';

  // get loggedIn(): boolean {
  //   return this._loggedIn;
  // }
  // @Input() // we are specifying that whatever value we are setting in child component from parent component.
  // set loggedIn(value: boolean) {
  //   this._loggedIn = value;
  //   if (value == true) {
  //     this.message = 'Welcome back Pramil';
  //   } else {
  //     this.message = 'Please login Pramil.';
  //   }
  // }

  // 2nd Approach of intercepting @Input property.
  // ngOnChanges()---

  @Input()
  loggedIn!: boolean;

  message = '';
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const loggedInValue = changes['loggedIn'];
    if (loggedInValue.currentValue == true) {
      this.message = 'loggedIn- Welcome back Pramil !';
    } else {
      this.message = 'loggedOut- Please Log in Pramil !';
    }
  }

  // @Input Decorator
  // @Input('loggedIn') // we can't use both way to use @Input Operator in one file. either use @Input Decorator or use 'Getters' and 'Setters'.
  // loggedInFlag: any;

  // viewChild decorator
  viewName = '';
  @ViewChild('viewChildRefVar')
  viewChildValue!: ElementRef;

  ngAfterViewInit(): void {
    console.log(this.viewChildValue.nativeElement);
    this.viewChildValue.nativeElement.focus();
  }

  // two way binding using setters and getters
  private hello = '';
  get customerName(): string {
    return this.hello;
  }
  set customerName(value: string) {
    this.hello = value;
    if (value === 'Pramil') {
      alert('Welcome back Pramil !');
    }
  }

  // Split Two Way binding Component interaction
  userName = '';
  greetPramil(value: string) {
    this.userName = value;
    if (value === 'Pramil') {
      alert('Welcome back Pramil !');
    }
  }

  // Component Interaction
  @Input('parentData')
  nameInput: string = '';

  @Output()
  childEvent: any = new EventEmitter();

  fireEvent() {
    this.childEvent.emit('Hey Kesarwani Pramil - Output Interaction');
  }

  // Structural Directive ngSwitch
  public colors = ['red', 'blue', 'green', 'yellow'];

  // Structural Directive ngSwitch
  color = 'red';

  // Structural Directive *ngIf
  displayName = true;

  // Two way Data binding
  name = '';

  // template Reference variable
  getLog(value1: any, value2: any) {
    console.log(value1 + value2);
  }

  eventValue: any = '';
  clickEvent(value: any) {
    console.log(value);
    this.eventValue = value;
  }

  titleStyles = {
    color: 'blue',
    fontStyle: 'italic',
  };

  // we can use class as a object also.
  messageClass = {
    // "text-success": !this.hasError,
    // "text-danger": this.hasError,
    // "text-special" : this.isSpecial
    'text-success': true,
    'text-danger': false,
    'text-special': true,
  };
  // we can use a style class as a array also.
  messageArr = ['text-success', 'text-danger'];
}
