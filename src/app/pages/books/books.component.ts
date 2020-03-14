import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { ContainerDatatables } from '../../interfaces/container-datatables.interface';
import { Datatables as DatatablesUtils } from '../../utils/Datatables';
import { Author } from '../../models/author.model';
import { Book } from '../../models/book.model';
import { Form } from '../../interfaces/form.interface';
import Swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

declare var $: any;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit {
  @ViewChild('template', {static: false}) template: TemplateRef<any>;
  @ViewChild('dt', {static: false}) table: ElementRef;

  public modalRef: BsModalRef;

  dtOptions: any = {};

  nested: ContainerDatatables = {
    dtOptions: {}
  };

  form: Form = {
    data: {}
  };

  constructor(
    private modalService: BsModalService,
    private booksService: BooksService
  ) { }

  ngOnInit() {
    this.loadDatatables();
  }

  ngAfterViewInit() {
   this.nested.table = $(this.table.nativeElement);
   this.nested.dtInstance = this.nested.table.DataTable(this.nested.dtOptions);

   this.nested.table
      .on('click', '.opt-edit', (e: JQuery.EventBase) => this.editEvent(e))
      .on('click', '.opt-delete', (e: JQuery.EventBase) => this.deleteEvent(e));
  }

  editEvent(e: JQuery.EventBase): void {
    const id: number = e.target.dataset.id;

    this.getBook(id);
  }

  getBook(id: number): void {
    this.booksService
        .getBook(id, {includes: 'genres'})
        .subscribe(response => this.openModal(response.data));
  }

  loadDatatables(): void {
    this.nested.dtOptions = {
      initComplete: DatatablesUtils.initComplete,
      order: [[ 0, 'desc' ]],
      responsive: true,
      dom: DatatablesUtils.DOM,
      lengthMenu: DatatablesUtils.LENGTH_MENU,
      serverSide: true,
      processing: true,
      ajax: (params: any, callback) => {
        params.listFormat = 'datatables';
        params.includes = 'author,genres';

        for (const i in this.form.data) {
          if (this.form.data[i]) {
            params[i] = this.form.data[i];
          }
        }

        return this.getBooks(params, callback);
      },
      columns: [
        {
          title: 'ID',
          data: 'id',
          name: 'id',
          className: 'dt-body-center'
        },
        {
          title: 'Title',
          data: 'title',
          name: 'title',
          width: '35%'
        },
        {
          title: 'Author',
          data: 'author',
          name: 'author.name',
          width: '20%',
          render: (data: Author, type: any, full: any) => {
            return data.name;
          }
        },
        {
          title: 'Genres',
          data: 'genres',
          name: 'genres',
          render: (data: any[], type: any, full: any) => {
            if (data.length === 0) {
              return '';
            }

            let html: string = `<div class='items-badges'>`;

            data.forEach((item: any) => {
                html += `<span class="badge badge-secondary">${ item.name }</span>`;
            });

            html += '</div>';

            return html;
          }
        },
        {
          title: 'Actions',
          render: (data: any, type: string, full: Book) => {
            const id = full.id;

            return `<div class="dt-actions">
                      <i class="fa fa-pencil icon-dt opt-edit blue"
                         data-toggle="tooltip"
                         data-placement="top"
                         title="Edit"
                         data-id="${id}"></i>
                      <i class="fa fa-trash icon-dt opt-delete grey"
                         data-toggle="tooltip"
                         data-placement="top"
                         title="Delete"
                         data-id="${id}"></i>
                    </div>`;
          }
        }
      ],
      drawCallback: (settings: any) => {

      },
      rowCallback: (row: Node, data: Book[] | object, index: number) => {
        $(row).data(data);

        return row;
      }
    };
  }

  getBooks(params: any, callback: any) {
    return this.booksService.getBooks(params)
               .subscribe(response => {
                  const data: any = response.data;

                  callback({
                      draw: data.draw,
                      recordsTotal: data.recordsTotal,
                      recordsFiltered: data.recordsFiltered,
                      data: data.items
                  });
               });
  }

  reloadData(resetPaging: boolean): void {
    DatatablesUtils.reloadData(this.nested.dtInstance, resetPaging);
  }

  updateSearchForm($event: any): void {
    this.form.data = $event;

    this.reloadData(true);
  }

  deleteEvent(e: JQuery.EventBase): void {
      const id: number = e.target.dataset.id;

      Swal.fire({
        title: 'Confirm',
        text: 'Do you want to delete the selected book?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then(confirm => {
        if (confirm.value) {
          this.deleteBook(id);
        }
      });
  }

  deleteBook(id: number): void {
    this.booksService
        .deleteBook(id)
        .subscribe(response => {
            Swal.fire(
              'Success',
              response.message,
              'success'
            );

            this.reloadData(false);
        });
  }

  openModal(data: any): void {
    this.modalRef = this.modalService.show(
      this.template,
      {
        backdrop: 'static',
        keyboard: false,
        class: 'modal-lg'
      }
    );

    this.modalRef.content = {
      title: data.id ? 'Edit Book' : 'Create Book',
      data
    };
  }
}