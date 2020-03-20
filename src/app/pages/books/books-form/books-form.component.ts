import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BooksService } from '../../../services/books.service';
import { AuthorsService } from '../../../services/authors.service';
import { GenresService } from '../../../services/genres.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Select2OptionData } from 'ng2-select2';
import { Api } from '../../../interfaces/api.interface';
import { Author } from 'src/app/models/author.model';
import Swal from 'sweetalert2';
import { extractColumn } from '../../../utils/Array';
import Patterns from '../../../utils/Patterns';
import { BsModalRef } from 'ngx-bootstrap';
import { Select2Data } from '../../../interfaces/select2-data.interface';
import { Select2 as Select2Utils } from '../../../utils/Select2';
import { ReactiveForm } from '../../../utils/ReactiveForm';

@Component({
  selector: 'app-books-form',
  templateUrl: './books-form.component.html',
  styleUrls: ['./books-form.component.css']
})
export class BooksFormComponent implements OnInit {

  @Input() modalRef: BsModalRef;
  @Output() reloadData: EventEmitter<boolean> = new EventEmitter();

  authors: Select2Data = {
    data: [],
    options: Select2Utils.getDefaultOptions(),
    disabled: false,
    selected: null
  };

  genres: Select2Data = {
    data: [],
    options: {
      ...Select2Utils.getDefaultOptions(),
      multiple: true
    },
    selected: [],
    disabled: false
  };

  id: number;
  form: ReactiveForm;

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private genresService: GenresService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.getGenres();
    this.getAuthors();
  }

  initializeForm(): void {
    const data: any = this.modalRef.content.data;

    this.id = data.id || null;

    const formBuilder: FormGroup = this.formBuilder.group({
      author_id: [data.authorId || '', Validators.required],
      publisher_id: [data.publisherId || 1, Validators.required],
      title: [data.title || '', Validators.required],
      summary: [data.summary || '', Validators.required],
      description: [data.description || '', Validators.required],
      quantity: [data.quantity || '', [Validators.required, Validators.pattern(Patterns.NUMBERS)]],
      price: [data.price || '', [Validators.required, Validators.pattern(Patterns.TWO_DECIMALS)]],
      genres: [extractColumn(data.genres || [], 'id', true), Validators.required]
    });

    this.form = new ReactiveForm(formBuilder);
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.form.container.controls; }

  accept(): void {
    const data: any = this.form.container.value;
    const isNewRecord: boolean = this.id ? false : true;

    this.form.isSaving = true;
    this.booksService
      .createOrUpdateBook(data, this.id)
        .subscribe((response: Api) => {
            this.form.isSaving = false;
            this.reloadData.emit(isNewRecord);
            this.close();

            Swal.fire({
              title: 'Success',
              text: response.message,
              type: 'success',
            });
        }, () => {
          this.form.isSaving = false;
        });
  }

  close() {
    if (!this.modalRef) {
      return;
    }

    this.modalRef.hide();
    document.querySelector('body').style.paddingRight = '0px';
  }

  getAuthors(): void {
    this.authors.disabled = true;
    this.authorsService
        .getAuthors()
        .subscribe((response: Api) => {
          const authors: Array<Select2OptionData> = response.data.map((author: Author) => {
            return {
              id: author.id,
              text: author.name
            };
          });

          this.authors.data = authors;
          this.authors.disabled = false;
          this.authors.selected = this.f.author_id.value;
        });
  }

  getGenres() {
    this.genres.disabled = true;
    this.genresService
        .getGenres()
        .subscribe((response: any) => {
          const genres: Array<Select2OptionData> = response.data.map((genre: any) => {
            const id: number = genre.id;

            return {
              id,
              text: genre.name
            };
          });

          this.genres.data = genres;
          this.genres.disabled = false;
          this.genres.selected = this.f.genres.value;
        });
  }

  eventChangeSelect(e: any, field: string): void {
    const control = this.f[field];

    control.markAsDirty();
    control.setValue(e.value);
  }


}
