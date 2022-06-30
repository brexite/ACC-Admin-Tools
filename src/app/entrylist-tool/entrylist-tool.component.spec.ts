import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrylistToolComponent } from './entrylist-tool.component';

describe('EntrylistToolComponent', () => {
  let component: EntrylistToolComponent;
  let fixture: ComponentFixture<EntrylistToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrylistToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrylistToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
