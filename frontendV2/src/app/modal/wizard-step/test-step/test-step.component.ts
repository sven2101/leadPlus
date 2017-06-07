import { AbstractModalContentDirective } from "./../../abstract-modal-content.directive";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AbstractModalFormContent } from "./../../abstract-modal-form-content";
import { Component, OnInit, Input, forwardRef } from "@angular/core";

@Component({
  selector: "test-step",
  templateUrl: "./test-step.component.html",
  styleUrls: ["./test-step.component.css"],
  providers: [{ provide: AbstractModalContentDirective, useExisting: forwardRef(() => TestStepComponent) }]
})
export class TestStepComponent implements OnInit, AbstractModalFormContent {

  // tslint:disable-next-line:no-input-rename
  @Input("step-content")
  stepContent: string;
  formModel: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formModel = this.formBuilder.group({
      testInput: ["", [Validators.required, Validators.maxLength(10)]]
    });
  }

  submitForm(): void {

  }

}
