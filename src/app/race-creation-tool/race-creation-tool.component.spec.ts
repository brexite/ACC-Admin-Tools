import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceCreationToolComponent } from './race-creation-tool.component';

describe('RaceCreationToolComponent', () => {
  let component: RaceCreationToolComponent;
  let fixture: ComponentFixture<RaceCreationToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceCreationToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceCreationToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
