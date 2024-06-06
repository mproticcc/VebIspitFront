import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviClanciComponent } from './svi-clanci.component';

describe('SviClanciComponent', () => {
  let component: SviClanciComponent;
  let fixture: ComponentFixture<SviClanciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SviClanciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviClanciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
