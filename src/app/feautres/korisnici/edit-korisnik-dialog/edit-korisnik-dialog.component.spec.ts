import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKorisnikDialogComponent } from './edit-korisnik-dialog.component';

describe('EditKorisnikDialogComponent', () => {
  let component: EditKorisnikDialogComponent;
  let fixture: ComponentFixture<EditKorisnikDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKorisnikDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditKorisnikDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
