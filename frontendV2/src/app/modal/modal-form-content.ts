import { FormGroup } from "@angular/forms";
export interface ModalFormContent {
    formModel: FormGroup;
    submitForm(): void;
    isFormValid(): boolean;
}