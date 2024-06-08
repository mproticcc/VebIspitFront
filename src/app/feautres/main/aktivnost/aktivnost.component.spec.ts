import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AktivnostComponent } from './aktivnost.component';

describe('AktivnostComponent', () => {
  let component: AktivnostComponent;
  let fixture: ComponentFixture<AktivnostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AktivnostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AktivnostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
