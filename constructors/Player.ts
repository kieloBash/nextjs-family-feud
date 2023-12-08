export interface PlayerType {
  name: string;
  score: number;
  mistakes: number;
}

class Player {
  name: string;
  score: number;
  mistakes: number;

  constructor(
    name: string,
    initialScore: number = 0,
    initialMistakes: number = 0
  ) {
    this.name = name;
    this.score = initialScore;
    this.mistakes = initialMistakes;
  }

  increaseScore(points: number): void {
    this.score += points;
  }

  decreaseScore(points: number): void {
    this.score -= points;
  }

  resetScore(): void {
    this.score = 0;
  }

  increaseMistakes(): void {
    this.mistakes += 1;
  }

  resetMistakes(): void {
    this.mistakes = 0;
  }

  getScore(): number {
    return this.score;
  }

  getMistakes(): number {
    return this.mistakes;
  }
}

export default Player;
