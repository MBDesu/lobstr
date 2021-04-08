import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Lobby } from 'src/app/models/lobby.model';

export class PlayerNameErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'lobstr-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  @Input() lobbyData!: Lobby;
  @Input() index!: number;
  @Output() onDelete = new EventEmitter<number>();
  
  showAddNewPlayer = false;
  playerNameErrorStateMatcher = new PlayerNameErrorStateMatcher();
  playerNameFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(85),
  ]);

  
  ngOnInit(): void {
    this.playerNameFormControl = new FormControl({ value: '', disabled: this.lobbyData.currentNumPlayers >= this.lobbyData.maxNumPlayers }, [
      Validators.required,
      Validators.maxLength(85)
    ]);
  }

  addPlayer(): void {
    if (this.playerNameFormControl.valid) {
      this.lobbyData.addPlayer(this.playerNameFormControl.value);
      this.resetAddPlayerState();
    }
  }

  deleteLobby(): void {
    this.onDelete.emit(this.index);
  }

  removePlayer(playerName: string): void {
    this.lobbyData.removePlayer(playerName);
    this.resetAddPlayerState();
  }

  resetAddPlayerState(): void {
    this.playerNameFormControl.reset({ value: '', disabled: this.lobbyData.currentNumPlayers >= this.lobbyData.maxNumPlayers });
  }

}
