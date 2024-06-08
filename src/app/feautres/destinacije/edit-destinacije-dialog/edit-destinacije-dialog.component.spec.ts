import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDestinacijeDialogComponent } from './edit-destinacije-dialog.component';

describe('EditDestinacijeDialogComponent', () => {
  let component: EditDestinacijeDialogComponent;
  let fixture: ComponentFixture<EditDestinacijeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDestinacijeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDestinacijeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
