import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { format } from 'path';
import { from, Observable, of } from 'rxjs';
import { debounceTime, distinct, first, last, take, takeLast, takeWhile } from 'rxjs/operators'; // we need to import these operators from 'rxjs/operators' it works but it won't work when we import it from 'rxjs' only.

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  categories = ['mobiles', 'chargers', 'headphones', 'laptop', 'mobiles'];
  category$: Observable<string> = from(this.categories);

  constructor() {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl('Start Search'),
      address: new FormControl(''),
    });

    // Example of "debounceTime()" Operator of Rxjs.
    this.searchForm
      .get('name')
      ?.valueChanges.pipe(
        takeWhile((v) => this.checkCondition(v)), // it takes value till the condition is true. returns boolean value.
        // take(2), // takes n values.
        debounceTime(3000) // time lag before it emits the next value.// rxJs operator need to be inside the pipe. it will delay the subscribe for 3 secs.
      )
      .subscribe((data) => {
        console.log(data);

        this.category$
          .pipe(
            distinct(),
            last()
        ).
          subscribe((data) => {
          console.log(data);
        });
      });
  }
  checkCondition(value: any) {
    return value.length > 5 ? false : true;
  }
}
