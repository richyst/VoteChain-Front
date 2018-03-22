import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotarComponent } from './votar.component';

describe('VotarComponent', () => {
  let component: VotarComponent;
  let fixture: ComponentFixture<VotarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
