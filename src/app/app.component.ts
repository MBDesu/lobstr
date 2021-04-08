import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLobbyModalComponent } from './components/add-lobby-modal/add-lobby-modal.component';
import { Lobby } from './models/lobby.model';

@Component({
  selector: 'lobstr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  lobbies: Lobby[] = [];
  playerCount = 0;

  constructor(private dialog: MatDialog) {}

  addNewLobby(): void {
    this.presentNewLobbyModal(newLobby => {
      if (newLobby !== null) {
        this.lobbies.push(newLobby);
      }
    });
  }

  private presentNewLobbyModal(callbackFn: (didConfirm: Lobby) => void): void {
    const dialogRef = this.dialog.open(AddLobbyModalComponent);
    dialogRef.afterClosed().subscribe(callbackFn);
  }

}
