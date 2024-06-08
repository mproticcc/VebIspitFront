import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClanciDialogComponent } from './edit-clanci-dialog.component';

describe('EditClanciDialogComponent', () => {
  let component: EditClanciDialogComponent;
  let fixture: ComponentFixture<EditClanciDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClanciDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClanciDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
