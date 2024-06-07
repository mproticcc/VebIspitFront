import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleClanakComponent } from './single-clanak.component';

describe('SingleClanakComponent', () => {
  let component: SingleClanakComponent;
  let fixture: ComponentFixture<SingleClanakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleClanakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleClanakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
