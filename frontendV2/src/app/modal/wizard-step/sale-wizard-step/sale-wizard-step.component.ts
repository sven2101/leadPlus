import { Subject, Observable } from "rxjs/Rx";
import { WorkflowService } from "./../../../workflow/workflow.service";
import { CommonValidators } from "./../../../common/common-validators";
import { AbstractModalContentDirective } from "./../../abstract-modal-content.component";
import { ModalComponent } from "./../../modal.component";
import { Process } from "./../../../process/process.model";
import { WorkflowUnit } from "./../../../workflow/workflowUnit.model";
import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, AsyncValidatorFn, AbstractControl } from "@angular/forms";
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

  constructor(private formBuilder: FormBuilder, private WorkflowService: WorkflowService) { }

  ngOnInit() {
    this.process.sale.invoiceNumber = "123";
    this.process.sale.saleTurnover = -1;
    this.process.sale.saleCost = 2;
    this.process.sale.saleProfit = 3;
    // console.log(this.process);
    this.formModel = this.formBuilder.group({
      saleTurnover: ["", [Validators.required, CommonValidators.min(0), CommonValidators.max(1000000000)]],
      invoiceNumber: ["", [Validators.maxLength(255), this.createValidator()]],
      saleCost: ["", [Validators.required, CommonValidators.max(1000000000), CommonValidators.min(0)]],
      saleProfit: [{ value: "", disabled: true }, [Validators.required, CommonValidators.max(1000000000), CommonValidators.min(0)]],
    });


  }
  submitForm(): void {

  }
  isFormValid(): boolean {
    return false;
  }

  validateInvoiceNumberAvalibility(v: any): any {
    console.log(v);

  }

  createValidator(): AsyncValidatorFn {

    // This is used to signal streams to terminate.
    const changed$ = new Subject<any>();

    return (control: AbstractControl): Observable<{} | null> => {
      changed$.next(); // This will signal the previous stream (if any) to terminate.
      console.log(control);
      return control.valueChanges
        .takeUntil(changed$)
        .take(1)
        .debounceTime(1000)
        .switchMap(value => this.validateInvoiceNumberAvalibility(value));
    };
  }

}
