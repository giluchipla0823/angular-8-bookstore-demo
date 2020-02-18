import { FormGroup } from '@angular/forms';

export class ReactiveForm {
    constructor(
        public container: FormGroup,
        public submitted: boolean = false,
        public isSaving: boolean = false
    ) {

    }
}