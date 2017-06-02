import { AbstractModalContentDirective } from "./abstract-modal-content.component";
import { SaleWizardStepComponent } from "./wizard-step/sale-wizard-step/sale-wizard-step.component";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ModalFormContent } from "./modal-form-content";
import { element } from "protractor";
import {
  Component, OnInit, AfterContentInit, ViewContainerRef, ViewChildren,
  AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, ContentChildren, ContentChild, QueryList
} from "@angular/core";



@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ModalComponent implements OnInit, AfterViewInit, AfterContentInit, ModalFormContent {

  formModel: FormGroup;
  currentStep = 1;

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

  @ContentChildren(AbstractModalContentDirective) contentChildren: QueryList<AbstractModalContentDirective>;
  maxContentHeight = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formModel = this.formBuilder.group({
    });

  }
  ngAfterViewInit() {
    this.getHtmlTagFromHtmlByTagNameRecursive(this.modalFooterButtonsElement.nativeElement, "BUTTON")
      .filter(b => b.hasAttribute("submit-button"))
      .map(b => b.disabled = true);
  }

  ngAfterContentInit(): void {
    [1, 2, 3, 4, 5]
      .forEach(x => this.maxContentHeight = this["step" + x + "ContentElement"].nativeElement.offsetHeight > this.maxContentHeight ?
        this["step" + x + "ContentElement"].nativeElement.offsetHeight :
        this.maxContentHeight);

  }

  private getHtmlTagFromHtmlByTagNameRecursive(html: any, tagName: string): Array<any> {
    if (html == null) { return []; }
    if (html.tagName === tagName) { return [html]; }
    const children: Array<any> = Array.from(html.children);
    if (children == null || children.length === 0) { return []; }
    return children.reduce((array, child) => array.concat(this.getHtmlTagFromHtmlByTagNameRecursive(child, tagName)), []);
  }

  public fireDismissEvent(event) {
    this.dismiss.emit(event);
  }

  public fireCloseEvent(event) {
    this.close.emit(event);
  }

  public isElementPresent(elementName: string): boolean {
    const element: ElementRef = this[elementName];
    if (element == null || element.nativeElement == null || element.nativeElement.children == null) { return false; }
    return element.nativeElement.children.length > 0;
  }

  public isChildFormValid(elementName: string): boolean {
    if (!this.isElementPresent(elementName)) { return true; }

  }

  submitForm(): void {

  }
  isFormValid(): boolean {
    return false;
  }

}
