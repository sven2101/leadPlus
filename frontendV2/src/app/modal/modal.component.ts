import { element } from "protractor";
import { StepSelectorDirective } from "./step-selector.directive";
import { SubmitButtonSelectorDirective } from "./submit-button-selector.directive";
import { AbstractModalContentDirective } from "./abstract-modal-content.directive";
import { SaleStepComponent } from "./wizard-step/sale-step/sale-step.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AbstractModalFormContent } from "./abstract-modal-form-content";

import {
  Component, OnInit, AfterContentInit, ViewContainerRef, ViewChildren,
  AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, ContentChildren, ContentChild, QueryList
} from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit, AfterViewInit, AfterContentInit {

  currentStep = 1;
  formModel: FormGroup;

  formMap = {};
  @Output() dismiss = new EventEmitter();
  @Output() close = new EventEmitter();

  @ViewChild("modalHeader") modalHeaderElement: ElementRef;
  @ViewChild("modalFooter") modalFooterElement: ElementRef;
  @ViewChild("modalFooterButtons") modalFooterButtonsElement: ElementRef;
  @ViewChild("step1Content") step1ContentElement: ElementRef;
  @ViewChild("step2Content") step2ContentElement: ElementRef;
  @ViewChild("step3Content") step3ContentElement: ElementRef;
  @ViewChild("step4Content") step4ContentElement: ElementRef;
  @ViewChild("step5Content") step5ContentElement: ElementRef;

  @ViewChildren("step1Content,step2Content,step3Content,step4Content,step5Content") stepContentElements: QueryList<ElementRef>;
  @ContentChildren(AbstractModalContentDirective) contentChildren: QueryList<AbstractModalFormContent>;
  @ContentChildren(SubmitButtonSelectorDirective) submitButtons: QueryList<SubmitButtonSelectorDirective>;
  maxContentHeight = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { }
  ngAfterViewInit() { }

  ngAfterContentInit(): void {
    [1, 2, 3, 4, 5]
      .forEach(x => this.maxContentHeight = this["step" + x + "ContentElement"].nativeElement.offsetHeight + 15 > this.maxContentHeight ?
        this["step" + x + "ContentElement"].nativeElement.offsetHeight + 15 :
        this.maxContentHeight);

    this.submitButtons.forEach((b, i) => { b["buttonId"] = i; b.onClick = this.fireCloseEvent.bind(this, i); });

    const contentChildrenForm = this.contentChildren.reduce((form, cc) => {
      if (cc.formModel == null) { return form; }
      cc.formModel.statusChanges.subscribe(event => this.formMap[cc.stepContent] = event);
      form[cc.constructor.name] = cc.formModel;
      return form;
    }, {});
    this.formModel = this.formBuilder.group(contentChildrenForm);
    this.formModel.statusChanges.subscribe(e => this.setButtonDisabled(e === "INVALID"));
    this.contentChildren.forEach(cc => cc.formModel ? this.formMap[cc.stepContent] = cc.formModel.status : null);
    this.setButtonDisabled(this.formModel.status === "INVALID");
  }

  private setButtonDisabled(disabled: boolean): void {
    this.getHtmlTagFromHtmlByTagNameRecursive<HTMLButtonElement>(this.modalFooterElement.nativeElement, "BUTTON")
      .filter(b => b.hasAttribute("submit-button"))
      .forEach(b => b.disabled = disabled);
  }

  private getHtmlTagFromHtmlByTagNameRecursive<T>(html: HTMLElement, tagName: string): Array<T> {
    if (html == null) { return []; }
    if (html.tagName === tagName) { return [html] as Array<any>; }
    const children: Array<any> = Array.from(html.children);
    if (children == null || children.length === 0) { return []; }
    return children.reduce((array, child) => array.concat(this.getHtmlTagFromHtmlByTagNameRecursive<T>(child, tagName)), []);
  }

  public fireDismissEvent(event): void {
    this.dismiss.emit(event);
  }

  public fireCloseEvent(buttonId: number): void {
    console.log("modal-component", buttonId);
    this.contentChildren.forEach(cc => cc.submitForm());
    this.submitButtons.filter(b => b["buttonId"] === buttonId)
      .forEach(b => b.emitSubmit());
    this.close.emit();
  }

  public isElementPresent(elementName: string): boolean {
    const element: ElementRef = this[elementName];
    if (element == null || element.nativeElement == null || element.nativeElement.children == null) { return false; }
    return element.nativeElement.children.length > 0;
  }

  public getNavItemClass(currentStep: number, tab: number, formMap: {}): string {
    if (formMap[tab] === "INVALID") { return "nav-link step-invalid"; }
    return currentStep === tab ? "nav-link step-active" : "nav-link step";
  }
}
