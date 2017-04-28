import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentCardComponent } from './managment-card.component';

describe('ManagmentCardComponent', () => {
  let component: ManagmentCardComponent;
  let fixture: ComponentFixture<ManagmentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagmentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
