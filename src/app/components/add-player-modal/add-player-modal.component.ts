import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PlayerNameErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'lobstr-add-player-modal',
  templateUrl: './add-player-modal.component.html',
  styleUrls: ['./add-player-modal.component.scss']
})
export class AddPlayerModalComponent {

  playerNameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(85)
  ]);

  playerNameErrorStateMatcher = new PlayerNameErrorStateMatcher();

  addPlayerToLobby(): string | null {
    return this.playerNameFormControl.value;
  }

}
