import { Directive } from "@angular/core";

@Directive({
  selector: "[step-1-content],[step-2-content],[step-3-content],[step-4-content],[step-5-content]"
})
export class StepSelectorDirective {

  constructor() { }

}
