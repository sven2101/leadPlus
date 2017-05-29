import { AbstractModalContentDirective } from "./../../abstract-modal-content.component";
import { ModalComponent } from "./../../modal.component";
import { Process } from "./../../../process/process.model";
import { WorkflowUnit } from "./../../../workflow/workflowUnit.model";
import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalFormContent } from "../../modal-form-content";


@Component({
  selector: "sale-wizard-step",
  templateUrl: "./sale-wizard-step.component.html",
  styleUrls: ["./sale-wizard-step.component.css"],
  providers: [{ provide: AbstractModalContentDirective, useExisting: forwardRef(() => SaleWizardStepComponent) }]
})
export class SaleWizardStepComponent implements OnInit, ModalFormContent {

  formModel: FormGroup;
  editWorkflowUnit: WorkflowUnit;
  @Input("process") process: Process;
  @Input("title") title: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.process);
    console.log(this.title);
    this.formModel = this.formBuilder.group({
      saleTurnover: ["", [Validators.required, Validators.maxLength(1000000000), Validators.minLength(0)]],
      invoiceNumber: ["", [Validators.maxLength(255)]],
      saleCost: ["", [Validators.required, Validators.maxLength(1000000000), Validators.minLength(0)]],
      saleProfit: [{ value: "", disabled: true }, [Validators.required, Validators.maxLength(1000000000), Validators.minLength(0)]],
    });
    this.formModel.setValue({
      saleTurnover: this.process.sale.saleTurnover,
      invoiceNumber: this.process.sale.invoiceNumber,
      saleCost: this.process.sale.saleCost,
      saleProfit: this.process.sale.saleProfit
    });
  }
  submitForm(): void {

  }
  isFormValid(): boolean {
    return false;
  }

}
