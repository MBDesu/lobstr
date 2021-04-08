import { Component } from '@angular/core';
import { Lobby } from 'src/app/models/lobby.model';

@Component({
  selector: 'lobstr-add-lobby-modal',
  templateUrl: './add-lobby-modal.component.html',
  styleUrls: ['./add-lobby-modal.component.scss']
})
export class AddLobbyModalComponent {

  lobbySize: number | null;

  constructor() {
    this.lobbySize = 6;
  }

  createNewLobby(): Lobby {
    return new Lobby(this.lobbySize || 6);
  }

}
