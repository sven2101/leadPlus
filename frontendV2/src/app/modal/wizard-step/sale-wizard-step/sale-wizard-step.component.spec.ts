import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SaleWizardStepComponent } from "./sale-wizard-step.component";

describe("SaleWizardStepComponent", () => {
  let component: SaleWizardStepComponent;
  let fixture: ComponentFixture<SaleWizardStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleWizardStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleWizardStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
