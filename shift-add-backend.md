# ShiftAdd

Hello! Below is a short take-home task that should give you a chance to show off your skills and experience in a working environment you are comfortable in.
We hope a week should be enough for you to squeeze in some time to have a go at it. Enjoy!

## Specification
**ShiftAdd** is a multiplayer online quiz game - think Wordle where there is a new challenge every so often but only one live challenge at any time.

**Given the specification below, your task is to write a server implementation for ShiftAdd.**

### Challenges
The server should randomly generate a new **challenge** every 30 seconds.

A challenge looks like this:

```
Challenge {
  int id;
  int a;
  int b;
}
where a and b are random numbers 0 <= a, b < 100
```

Only one challenge is live at any given time. The **solution** to a challenge is `a + b`.

The server is only required to persist state in memory.

### Players
A **player** of the game (i.e. a client of the server), can only submit one solution per challenge.
A submission should be rejected if it is not for the current challenge.

For a submission for the current challenge, the server should return a score to the player.
The score is calculated as how much time is left in the lifetime of the current challenge (to hundredths of a second), i.e. quicker answers get a higher score!
An incorrect solution receives a score of -1.

### Statistics
Upon request:

- The server should return a player's mean score, number of challenges taken part in, and longest streak of correct solutions without missing a challenge.
- The server should return the mean score for a given challenge (for all players that took part).

Good luck!