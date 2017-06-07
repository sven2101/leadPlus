import { AbstractModalContentDirective } from "./../../abstract-modal-content.directive";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AbstractModalFormContent } from "./../../abstract-modal-form-content";
import { Component, OnInit, Input, forwardRef } from "@angular/core";

@Component({
  selector: "sven",
  templateUrl: "./sven.component.html",
  styleUrls: ["./sven.component.css"],
  providers: [{ provide: AbstractModalContentDirective, useExisting: forwardRef(() => SvenComponent) }]
})
export class SvenComponent implements OnInit, AbstractModalFormContent {

  // tslint:disable-next-line:no-input-rename
  @Input("step-content")
  stepContent: string;
  formModel: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  submitForm(): void {
  };
  ngOnInit() {
    this.formModel = this.formBuilder.group({
      svenInput: ["", Validators.required]
    });
  }

}
