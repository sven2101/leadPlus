import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SaleStepComponent } from "./sale-step.component";

describe("SaleStepComponent", () => {
  let component: SaleStepComponent;
  let fixture: ComponentFixture<SaleStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
