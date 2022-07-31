import {v4 as uuidv4} from 'uuid';

export class User {
  userId: string;
  private submissions: Array<number>;
  private scorePerChallenge: Record<string, number>;

  constructor() {
    this.userId = uuidv4();
    this.submissions = [];
    this.scorePerChallenge = {};
  }

  getMeanScore(): number {
    const scores: Array<number> = Object.values(this.scorePerChallenge);
    const total: number = scores.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0);
    return total / scores.length;
  }

  getNumberOfChallengesParticipatedIn(): number {
    return Object.values(this.scorePerChallenge).length;
  }

  getlongestStreak(): number {
    let longestStreak: number = 0;
    let count: number = 0;

    for (let i = 0; i < this.submissions.length; i++) {
      if (this.submissions[i] === this.submissions[i - 1] + 1){
        count++;
      }
      else{
        count = 1;
      }

      longestStreak = Math.max(longestStreak, count);
    }

    return longestStreak;
  }

  saveChallenge(challengeId: number, score: number): void {
    this.submissions.push(challengeId);
    this.scorePerChallenge[challengeId] = score;
  }

  hasSubmitted(challengeId: number): boolean {
    return this.submissions.includes(challengeId);
  }
}