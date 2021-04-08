import { EventEmitter } from "@angular/core";

export class Lobby {
  private _players: string[];
  private _currentNumPlayers: number;
  private _maxNumPlayers: number;

  constructor(maxNumPlayers?: number) {
    this._players = [];
    this._currentNumPlayers = 0;
    this._maxNumPlayers = maxNumPlayers || 6;
  }

  get players(): string[] {
    return this._players;
  }

  get currentNumPlayers(): number {
    this._currentNumPlayers = this._players.length;
    return this._currentNumPlayers;
  }

  get maxNumPlayers(): number {
    return this._maxNumPlayers;
  }

  public addPlayer(playerName: string): void {
    const hasPlayer = this.hasPlayer(playerName);
    if (this.isFull()) {
      throw new Error('Lobby is full');
    } else if (hasPlayer) {
      throw new Error('Lobby contains this player already');
    } else {
      this._players.push(playerName);
      this._currentNumPlayers = this._players.length;
    }
  }

  public removePlayer(playerName: string): string {
    const playerIndex = this.getPlayerIndex(playerName);
    if (playerIndex > -1) {
      this._players.splice(playerIndex, 1);
      this._currentNumPlayers = this._players.length;
      return playerName;
    }
    return '';
  }

  public clearPlayers(): void {
    this._players = new Array<string>();
    this._currentNumPlayers = 0;
  }

  public isFull(): boolean {
    return this._currentNumPlayers >= this._maxNumPlayers;
  }

  public hasPlayer(playerName: string): boolean {
    for (let i = 0; i < this._players.length; i++) {
      if (this._players[i].toLowerCase() === playerName.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  private getPlayerIndex(playerName: string): number {
    for (let i = 0; i < this._players.length; i++) {
      if (this._players[i].toLowerCase() === playerName.toLowerCase()) {
        return i;
      }
    }
    return -1;
  }

}