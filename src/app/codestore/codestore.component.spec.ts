import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodestoreComponent } from './codestore.component';

describe('CodestoreComponent', () => {
  let component: CodestoreComponent;
  let fixture: ComponentFixture<CodestoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodestoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodestoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
