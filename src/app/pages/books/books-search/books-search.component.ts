import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AuthorsService } from '../../../services/authors.service';
import { Form } from '../../../interfaces/form.interface';

import { Select2 as Select2Utils } from '../../../utils/Select2';
import { Select2Data } from '../../../interfaces/select2-data.interface';
import { Api } from '../../../interfaces/api.interface';
import { Select2OptionData } from 'ng2-select2';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.css']
})
export class BooksSearchComponent implements OnInit, AfterViewInit {
  @ViewChild('selectSearchAuthor', {static: false}) select2Author: any;
  @Output() updateForm: EventEmitter<any> = new EventEmitter();

  form: Form = {
    data: {}
  };

  authors: Select2Data = {
    data: [],
    options: Select2Utils.getDefaultOptions(),
    selected: null,
    disabled: false
  };

  constructor(private authorsService: AuthorsService) { }

  cambiarSelect($event: any) {
    console.log($event);
  }

  ngOnInit() {
    this.getAuthors();
  }

  ngAfterViewInit() {
    Select2Utils.setEventToCloseWhenUnselecting();
  }

  search() {
    this.updateForm.emit(this.form.data);
  }

  getAuthors(): void {
    this.authors.disabled = true;

    this.authorsService.getAuthors()
        .subscribe((response: Api) => {
          const authors: Array<Select2OptionData> = response.data.map((author: Author) => {
            return {
              id: author.id,
              text: author.name
            };
          });

          this.authors.selected = '';
          this.authors.data = authors;
          this.authors.disabled = false;

        });
  }

  eventChangeSelect(e: any, field: string): void {

    const value = e.value;

    console.log('eventChangeSelect', e);

    delete this.form.data[field];

    if (value) {
      this.form.data[field] = {
        id: value
      };
    }

    this.search();
  }

  clearForm(): void {
    const select2Elements: any[] = [
      {
        element: this.select2Author.element,
        field: 'author'
      }
    ];

    select2Elements.forEach( item  => {
      item.element.val(null).trigger('change');

      this.eventChangeSelect({value: null, data: []}, item.field);
    });
  }

}
