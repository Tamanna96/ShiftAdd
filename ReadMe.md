### Solution
The solution has been written in TypeScript.

#### Approach
Approach taken splits the code up into 3 different classes:

- `shiftAddServer`
- `challenge`
- `user`

The different classes are responsible for performing different actions in the specification. This approach has been taken to demonstrate some features of OOP, mainly encapsulation.

Encapsulation has been used to only reveal the data that is necessary to other classes, for example there are a bunch of private variables and functions, which only needs to be used in the class itself and nowhere else. Additionally, the way the code has been setup will allow for inheritance, polymorphism and abstraction to be used if the program was to be enhanced.

#### `shiftAddServer.ts`
The `shiftAddServer` class is the class that the client side will interact with. Within this class, it has 3 instance variables:

- `numberOfChallenges` - this is used to track the number of challenges as well as to provide each challenge with an ID.
- `challenges` - holds a map of challenge ID to `Challenge`. The `Record` utility type is used to allow quick access to the challenge when required, as well as allowing to dynamically add to it when a new challenge has been added.
- `users` - holds a map of user ID to `User`. Again the the `Record` utility type has been used based on the benefits metioned above.

The main function is `submitAnswer`, this function will make the necessary checks to ensure that the user can make the submission. If any checks fail then an error will be thrown. Otherwise, it will check the solution, store any necessary data and then return the score to the user. It will call upon the `challenge` and `user` class to make these checks as well as store the necessary data to be able to retrieve statistics.

Aditionally, to generate a new challenge every 30 seconds, the in built JavaScript function `setInterval` has been used and will be initialised when the `shiftAddServer` is initialised.

#### `challenge.ts`
This `challenge` class is used to store data about the challenge, such as it's ID, solution and statistical information. It has been created as a separate class as the details of the class does not need to be revealed to other classes. The only instance variable other classes can know about is the ID, any actions to be performed on the other variables can be done via function calls and to retrieve data the functions can be called too.

#### `user.ts`
The `user` class is used to store data about the user, such as their ID and statistical information. It has been created as a separate class as the details of the class does not need to be revealed to other classes. The only instance variable other classes can know about is the ID, any actions to be performed on the other variables can be done via function calls and to retrieve data the functions can be called too.

#### `constants.ts`
The `constants` class is used to store data for constants where the data won't be changed. The constants can be reused in different classes and it reduces code duplicate. There is only a single constant in the file currently, but can be added to if the program is the be enhanced.