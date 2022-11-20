import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RxjsLearningComponent } from './rxjs-learning/rxjs-learning.component';
import { CompInteractionServiceService } from './Services/comp-interaction-service.service';
import { TestComponent } from './test/test.component';
import { ViewChildExampleComponent } from './view-child-example/view-child-example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'RxjsProject';

  // Component interaction using "Services" between non-related(no Parent - child relationships) components
  constructor(private _compInteractionService : CompInteractionServiceService) { }
  
  greetStudent() {
    this._compInteractionService.sendMessage('Good Morning Students')
  }
  appreciateStudent() {
    this._compInteractionService.sendMessage('Well Done Students')
  }

  // Component interaction using @Output Decorator for accessing the properties of parent component class from child Components---
  greet(value: string) {
    alert(
      'this is Parent component class Property called from child Component' +
        '\n' +
        value
    );
  }


  // component interaction using @ViewChild(Component Name) - using this we can interact with child components properties and methods in parent components classes also.
  @ViewChild(TestComponent)
  testComponentRef!: TestComponent;

  ngAfterViewInit() {
    this.testComponentRef.parentChildInteractionInChild =
      'Hello Pramil this is example of Component Interaction using @ViewChild in parent component Class.';
  }

  // Example of @Input Decorator
  userLoggedIn = true;

  // Component Interaction using @Output Decorator
  parentDataValue = 'Pramil Kesarwani';
  message = '';

  receivedEvent(value: any) {
    this.message = value;
  }

  // Angular10 viewChild and ViewChildren example - 82,83

  // @ViewChild('headline')
  // headlineValue!: ElementRef;

  // @ViewChild(ViewChildExampleComponent)
  //   changeChildComponentValue! : ViewChildExampleComponent

  // @ViewChild(RxjsLearningComponent)
  // changeRxjsComponentValue!: RxjsLearningComponent;

  // // @viewChild will be initialized/used only with ngAfterViewInit() , not in ngOnInit()
  // ngAfterViewInit(): void {  // ngAfterViewInit() lifeCycle enables only after initialization of page.
  //   console.log(this.headlineValue.nativeElement.innerHTML);
  //   this.changeChildComponentValue.isUserSuperAdmin = true;
  //   this.changeChildComponentValue.screenName = "Hello Pramil"; // we can change any child Component value from its parent component using @ViewChild Decorator.
  //                                                               // but we can't access any child component's HTML from its Parent Component.
  //                                                               // but we can access any component's HTML from its component using @ViewChild using reference#
  //   this.changeRxjsComponentValue.viewChildValue = "Hello Kesarwani" // important Note - we can't access any route component as a child component.
  // }
  // ngOnInit(): void { // it will enable first even after writing ngAfterViewInit()
  //   console.log('pramil');
  // }
}
