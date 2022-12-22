import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap  } from 'rxjs/operators';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  private searchText$ = new Subject<string>();
  books$: any;
  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.books$ = this.searchText$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(book =>
        this.bookService.getBooks(book))
    );
  }

  onSearch($event: any) {
    const value = $event.target.value;
    if(value) {
      this.searchText$.next(value);
    }
  }

  selectBook(name:string) {
    (<HTMLInputElement>document.getElementById("search")).value = name;
  }

  clearSearch(){
    (<HTMLInputElement>document.getElementById("search")).value = '';
  }
}
