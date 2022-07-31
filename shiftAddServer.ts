import {Challenge} from './challenge';
import {User} from './user';
import {THIRTHY_MILLISECONDS} from './constants';

export class ShiftAddServer {
  private numberOfChallenges: number;
  private challenges: Record<number, Challenge>;
  private users: Record<string, User>;

  constructor() {
    this.numberOfChallenges = 0;
    this.challenges = {};
    this.users = {};

    setInterval(this.generateNewChallenge, THIRTHY_MILLISECONDS);
  }

  submitAnswer(userId: string, challengeId: number, userAnswer: number): number {
    const challenge: Challenge | undefined = this.challenges[challengeId];

    if (!challenge) {
      throw new Error('Challenge does not exist.');
    }

    if (challenge.hasExpired()) {
      throw new Error('Challenge has ended! Submission for this challenge cannot be made!')
    }

    if (this.checkIfUserHasSubmitted(userId, challengeId)) {
      throw new Error('Answer for this challenge has already been submitted! Cannot submit answer again!');
    }

    const score: number = challenge.checkSolutionAndGetScore(userAnswer);

    this.saveUserChallengeInfo(userId, challengeId, score);
    this.saveChallengeInfo(challenge, score)

    return score;
  }

  getMeanScoreForUser(userId: string): number {
    const user: User | undefined = this.users[userId];
    return user ? user.getMeanScore() : 0;
  }

  getNumberOfChallengesParticipatedInForUser(userId: string): number {
    const user: User | undefined = this.users[userId];
    return user ? user.getNumberOfChallengesParticipatedIn() : 0;
  }

  getlongestStreakForUser(userId: string): number {
    const user: User | undefined = this.users[userId];
    return user ? user.getlongestStreak() : 0;
  }

  getMeanScoreForChallenge(challengeId: number): number {
    const challenge: Challenge | undefined = this.challenges[challengeId];
    return challenge ? challenge.getMeanScore() : 0;
  }

  private checkIfUserHasSubmitted(userId: string, challengeId: number): boolean {
    let user: User | undefined = this.users[userId];

    if (!user) {
      user = new User();
      this.users[user.userId] = user;
    }

    return user.hasSubmitted(challengeId);
  }

  private generateNewChallenge(): void {
    this.numberOfChallenges++;
    const challenge: Challenge = new Challenge(this.numberOfChallenges);
    this.challenges[challenge.id] = challenge;
  }

  private saveUserChallengeInfo(userId: string, challengeId: number, score: number): void {
    this.users[userId].saveChallenge(challengeId, score);
  }

  private saveChallengeInfo(challenge: Challenge, score: number): void {
    challenge.saveChallengeData(score);
  }
}