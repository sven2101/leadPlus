import { element } from "protractor";
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { WizardStep } from "./wizard-step.enum";


@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ConfirmationComponent implements OnInit, AfterViewInit {

  currentStep = 1;

  @Output() dismiss = new EventEmitter();
  @Output() close = new EventEmitter();

  @ViewChild("modalTitle") modalTitleElement: ElementRef;
  @ViewChild("modalFooter") modalFooterElement: ElementRef;
  @ViewChild("wizardStep1Content") wizardStep1ContentElement: ElementRef;
  @ViewChild("wizardStep2Content") wizardStep2ContentElement: ElementRef;
  @ViewChild("wizardStep3Content") wizardStep3ContentElement: ElementRef;
  @ViewChild("wizardStep4Content") wizardStep4ContentElement: ElementRef;
  @ViewChild("wizardStep5Content") wizardStep5ContentElement: ElementRef;

  constructor() { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    /*
    console.log(this.h1Element.nativeElement);
    console.log(this.h2Element.nativeElement);
    console.log(this.h3Element.nativeElement);
    console.log(this.modalTitleElement.nativeElement);
    console.log(this.modalFooterElement.nativeElement);
    */
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

}
