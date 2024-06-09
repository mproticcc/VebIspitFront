import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdabranaDestinacijaComponent } from './odabrana-destinacija.component';

describe('OdabranaDestinacijaComponent', () => {
  let component: OdabranaDestinacijaComponent;
  let fixture: ComponentFixture<OdabranaDestinacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdabranaDestinacijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdabranaDestinacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
