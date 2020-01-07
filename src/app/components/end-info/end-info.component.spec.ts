import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EndInfoComponent} from './end-info.component';

describe('EndInfoComponent', () => {
  let component: EndInfoComponent;
  let fixture: ComponentFixture<EndInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EndInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
