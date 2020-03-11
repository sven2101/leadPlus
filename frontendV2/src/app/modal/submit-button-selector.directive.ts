import { Directive, Output, EventEmitter, HostListener } from "@angular/core";

@Directive({
  selector: "[submit-button]"
})
export class SubmitButtonSelectorDirective {

  @Output() submit = new EventEmitter();
  @HostListener("click", ["$event"]) onClick;

  constructor() {
    this.submit = new EventEmitter();
  }

  emitSubmit() {
    this.submit.emit();
  }

}
