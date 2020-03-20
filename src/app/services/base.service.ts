import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SerializerParams } from '../utils/SerializerParams';
import { environment } from '../../environments/environment';

const BASE_URL: string = environment.BASE_URL;

@Injectable()
export class BaseService {

  protected BASE_URL: string = BASE_URL;
  protected API_URL_V1: string = `${BASE_URL}v1/`;

  constructor(
    protected http: HttpClient
  ) { }

  protected resolveQueryParams(params?: any) {
      return params ? `?${SerializerParams.serialize(params)}` : '';
  }
}
