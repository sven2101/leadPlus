import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvenComponent } from './sven.component';

describe('SvenComponent', () => {
  let component: SvenComponent;
  let fixture: ComponentFixture<SvenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
