import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaddleBallComponent } from './paddle-ball.component';

describe('PaddleBallComponent', () => {
  let component: PaddleBallComponent;
  let fixture: ComponentFixture<PaddleBallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaddleBallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaddleBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
