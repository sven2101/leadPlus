import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStepComponent } from './test-step.component';

describe('TestStepComponent', () => {
  let component: TestStepComponent;
  let fixture: ComponentFixture<TestStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
