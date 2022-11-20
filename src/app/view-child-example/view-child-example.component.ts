import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-child-example',
  templateUrl: './view-child-example.component.html',
  styleUrls: ['./view-child-example.component.scss']
})
export class ViewChildExampleComponent implements OnInit,AfterViewInit {

  isUserSuperAdmin: boolean = false;
  screenName = "hello"

  @ViewChild('viewChild')
    viewChildValue! : ElementRef 

  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.viewChildValue.nativeElement.innerHTML)
  }


  ngOnInit(): void {
  }

  

}
