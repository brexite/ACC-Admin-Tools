import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrylistEditorComponent } from './entrylist-editor.component';

describe('RaceResultsToolComponent', () => {
  let component: EntrylistEditorComponent;
  let fixture: ComponentFixture<EntrylistEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrylistEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrylistEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
