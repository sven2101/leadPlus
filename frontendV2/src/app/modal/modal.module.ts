import { ReactiveFormsModule } from "@angular/forms";
import { SaleWizardStepComponent } from "./wizard-step/sale-wizard-step/sale-wizard-step.component";
import { ModalComponent } from "./modal.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ModalComponent,
    SaleWizardStepComponent
  ],
  exports: [
    ModalComponent,
    SaleWizardStepComponent
  ]
})
export class ModalModule { }
