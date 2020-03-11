import { ReactiveFormsModule } from "@angular/forms";
import { SaleStepComponent } from "./wizard-step/sale-step/sale-step.component";
import { ModalComponent } from "./modal.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubmitButtonSelectorDirective } from "./submit-button-selector.directive";
import { StepSelectorDirective } from "./step-selector.directive";
import { TestStepComponent } from "./wizard-step/test-step/test-step.component";
import { SvenComponent } from "./wizard-step/sven/sven.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ModalComponent,
    SaleStepComponent,
    SubmitButtonSelectorDirective,
    StepSelectorDirective,
    TestStepComponent,
    SvenComponent
  ],
  exports: [
    ModalComponent,
    SaleStepComponent,
    SubmitButtonSelectorDirective,
    StepSelectorDirective,
    TestStepComponent,
    SvenComponent
  ]
})
export class ModalModule { }
