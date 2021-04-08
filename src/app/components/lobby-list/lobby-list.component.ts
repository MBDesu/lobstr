import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChildren } from '@angular/core';
import { Lobby } from 'src/app/models/lobby.model';
import { LobbyComponent } from '../lobby/lobby.component';

@Component({
  selector: 'lobstr-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.scss']
})
export class LobbyListComponent implements OnInit {

  _lobbies!: Array<Lobby>;
  @ViewChildren('lobbies') lobbyComponents!: Array<LobbyComponent>;

  constructor() { }

  ngOnInit(): void { }

  @Input() set lobbies(lobbies: Array<Lobby>) {
    this._lobbies = lobbies;
  }

  dropPlayer(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const lobbyIndex = this.findLobbyIndexByPlayers(event.container.data);
      const canMovePlayer = lobbyIndex > -1 && !this._lobbies[lobbyIndex].isFull();
      if (canMovePlayer) {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        this.updateAddPlayerForms();   
      }
    }
  }

  private updateAddPlayerForms(): void {
    for (const lobby of this.lobbyComponents) {
      lobby.resetAddPlayerState();
    }
  }

  shufflePlayers(): void {
    let shuffledPlayers = this.shuffleArray(this.getAllPlayersFromLobbies());
    for (let i = 0; i < this._lobbies.length; i++) {
      this._lobbies[i].clearPlayers();
      for (let j = 0; j < this._lobbies[i].maxNumPlayers; j++) {
        if (shuffledPlayers[j]) {
          this._lobbies[i].addPlayer(shuffledPlayers[j]);
        }
      }
      shuffledPlayers.splice(0, this._lobbies[i].maxNumPlayers);
    }
    this.updateAddPlayerForms();
  }

  private shuffleArray<T>(arr: Array<T>): Array<T> {
    let currentIndex = arr.length;
    let temp: T;
    let randomIndex: number;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temp = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temp;
    }

    return arr;
  }

  private getAllPlayersFromLobbies(): Array<string> {
    const players: Array<string> = [];
    this._lobbies.forEach((lobby) => {
      lobby.players.forEach((player) => {
        players.push(player);
      });
    });
    return players;
  }

  deleteLobby(index: number): void {
    this._lobbies.splice(index, 1);
  }

  private findLobbyIndexByPlayers(players: Array<string>): number {
    for (let i = 0; i < this._lobbies.length; i++) {
      if (this._lobbies[i].players === players) {
        return i;
      }
    }
    return -1;
  }

}
