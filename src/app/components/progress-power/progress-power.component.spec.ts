import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressPowerComponent } from './progress-power.component';

describe('ProgressPowerComponent', () => {
  let component: ProgressPowerComponent;
  let fixture: ComponentFixture<ProgressPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressPowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
