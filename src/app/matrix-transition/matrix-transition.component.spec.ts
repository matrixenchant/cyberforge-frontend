import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixTransitionComponent } from './matrix-transition.component';

describe('MatrixTransitionComponent', () => {
  let component: MatrixTransitionComponent;
  let fixture: ComponentFixture<MatrixTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixTransitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
