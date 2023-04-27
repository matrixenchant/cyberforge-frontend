import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseImgComponent } from './case-img.component';

describe('CaseImgComponent', () => {
  let component: CaseImgComponent;
  let fixture: ComponentFixture<CaseImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
