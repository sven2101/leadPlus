import { element } from "protractor";
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { WizardStep } from "./wizard-step.enum";


@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"]
})
export class ConfirmationComponent implements OnInit, AfterViewInit {

  WizardStep = WizardStep;
  currentStep: WizardStep = WizardStep.H1;

  @Output() dismiss = new EventEmitter();
  @Output() close = new EventEmitter();

  @ViewChild("modalTitle") modalTitleElement: ElementRef;
  @ViewChild("modalFooter") modalFooterElement: ElementRef;
  @ViewChild("h1") h1Element: ElementRef;
  @ViewChild("h2") h2Element: ElementRef;
  @ViewChild("h3") h3Element: ElementRef;
  @ViewChild("h4") h4Element: ElementRef;

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

  public isElementPresent(element: ElementRef): boolean {
    if (element == null || element.nativeElement == null || element.nativeElement.children == null) { return false; }
    return element.nativeElement.children.length > 0;
  }

}
