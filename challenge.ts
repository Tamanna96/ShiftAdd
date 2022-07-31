import {THIRTHY_MILLISECONDS} from './constants';

export class Challenge {
  id: number;
  private a: number;
  private b: number;
  private startTime: number;
  private endTime: number;
  private totalScore: number;
  private numberOfPlays: number;

  constructor(id: number) {
    this.id = id;
    this.a = this.generateRandomNumber();
    this.b = this.generateRandomNumber();
    this.startTime = Date.now();
    this.endTime = this.startTime + THIRTHY_MILLISECONDS;
    this.totalScore = 0;
    this.numberOfPlays = 0;
  }

  checkSolutionAndGetScore(userAnswer: number): number {
    const isCorrect: boolean = userAnswer === this.getSolution();
    return this.getScore(isCorrect);
  }

  getMeanScore(): number {
    return this.totalScore / this.numberOfPlays;
  }

  saveChallengeData(score: number): void {
    this.numberOfPlays++;
    this.totalScore += score;
  }

  hasExpired(): boolean {
    return Date.now() > this.endTime;
  }

  private getSolution(): number {
    return this.a + this.b;
  }

  private getScore(isCorrect: boolean): number {
    return isCorrect ? -1 : ((this.endTime - this.startTime) / 100);
  }

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * 100);
  }
}