import { ValidationErrors } from './validation-errors.interface';
import { ApiVersion } from './api-version';

export interface Api {
    jsonApi: ApiVersion;
    code: number;
    status: number;
    message: string;
    data?: any;
    errors?: any | ValidationErrors;
}