import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ContainerDatatables } from '../../interfaces/container-datatables.interface';
import { Form } from '../../interfaces/form.interface';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, AfterViewInit {

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
  ) { }


  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  

}
