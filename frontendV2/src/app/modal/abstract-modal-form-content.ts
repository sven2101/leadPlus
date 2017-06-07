import { FormGroup } from "@angular/forms";
import { Input } from "@angular/core";
export interface AbstractModalFormContent {

    /**
     * // tslint:disable-next-line:no-input-rename
     * @Input("step-content")
     */
    stepContent: string;
    formModel: FormGroup;
    submitForm(): void;
}