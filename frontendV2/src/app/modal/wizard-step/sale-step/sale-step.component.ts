import { Subject, Observable } from "rxjs/Rx";
import { WorkflowService } from "./../../../workflow/workflow.service";
import { CommonValidators } from "./../../../common/common-validators";
import { AbstractModalContentDirective } from "./../../abstract-modal-content.directive";
import { ModalComponent } from "./../../modal.component";
import { Process } from "./../../../process/process.model";
import { WorkflowUnit } from "./../../../workflow/workflowUnit.model";
import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
import { AbstractModalFormContent } from "../../abstract-modal-form-content";


@Component({
  selector: "sale-step",
  templateUrl: "./sale-step.component.html",
  styleUrls: ["./sale-step.component.css"],
  providers: [{ provide: AbstractModalContentDirective, useExisting: forwardRef(() => SaleStepComponent) }]
})
export class SaleStepComponent implements OnInit, AbstractModalFormContent {

  // tslint:disable-next-line:no-input-rename
  @Input("step-content") stepContent;

  @Input("process") process: Process;
  formModel: FormGroup;
  private isInvoiceNumberAvailibleValidatorTimeout;
  public invoiceNumberAlreadyExists;
  constructor(private formBuilder: FormBuilder, private WorkflowService: WorkflowService) { }

  ngOnInit() {
    this.process.sale.invoiceNumber = "123";
    this.process.sale.saleTurnover = -1;
    this.process.sale.saleCost = 2;
    this.process.sale.saleProfit = 3;
    // console.log(this.process);
    this.formModel = this.formBuilder.group({
      saleTurnover: ["", [Validators.required, CommonValidators.min(0), CommonValidators.max(1000000000)]],
      invoiceNumber: ["", [Validators.maxLength(255)]],
      saleCost: ["", [Validators.required, CommonValidators.max(1000000000), CommonValidators.min(0)]],
      saleProfit: [{ value: "", disabled: true }, [Validators.required, CommonValidators.max(1000000000), CommonValidators.min(0)]],
    });
    this.formModel.patchValue(this.process.sale);
  }


  isInvoiceNumberAvailible(invoiceNumber: string): Promise<ValidationErrors | null> {
    clearTimeout(this.isInvoiceNumberAvailibleValidatorTimeout);
    return new Promise((resolve, reject) => {
      if (invoiceNumber == null || invoiceNumber === "") {
        this.invoiceNumberAlreadyExists = false;
        resolve();
        return;
      }
      this.isInvoiceNumberAvailibleValidatorTimeout = setTimeout(() => {
        const self = this;
        this.WorkflowService.getSaleByInvoiceNumber(invoiceNumber)
          .then(response => {
            console.log(response);
            self.invoiceNumberAlreadyExists = response.length > 0 && response[0].id !== this.process.sale.id;
            resolve();
          })
          .catch(error => resolve({ availability: true }));
      }, 500);
    });
  }

  submitForm(): void {
    Object.keys(this.formModel.controls)
      .map(key => this.process.sale[key] = this.formModel.get(key).value);
  }
}
