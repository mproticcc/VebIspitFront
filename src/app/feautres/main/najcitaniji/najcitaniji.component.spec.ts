import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NajcitanijiComponent } from './najcitaniji.component';

describe('NajcitanijiComponent', () => {
  let component: NajcitanijiComponent;
  let fixture: ComponentFixture<NajcitanijiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NajcitanijiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NajcitanijiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
