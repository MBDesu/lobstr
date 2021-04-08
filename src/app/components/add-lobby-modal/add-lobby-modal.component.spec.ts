import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLobbyModalComponent } from './add-lobby-modal.component';

describe('AddLobbyModalComponent', () => {
  let component: AddLobbyModalComponent;
  let fixture: ComponentFixture<AddLobbyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLobbyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLobbyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
