# CLI-inventory-database
A practice app using MySQL + the mysql node package to view and interact with a SQL database.

## About
This is a practice app using MySQL and the mysql node package to view and interact with a SQL database. The database is a mock inventory for a guitar store, and is manipulated through command line prompts. The customer js file allows users to "purchase" items and update the store's inventory. The manager js file allows users to view low stock, add stock, or create SQL rows for new items.

### Package Dependecies
* [MySQL](https://www.npmjs.com/package/mysql)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [Colors](https://www.npmjs.com/package/colors)

## Documentation

### Demo

![App Gif-2](/assets/media/word-guess-demo2.gif)

First, a random word is chosen from an existing array in `index.js`. The command line window displays the game word as a series of underscores to show how many unguessed letters remain. When a letter is correctly guessed, that letter is revealed in the console. If all letters are guessed, the game-winning text displays in rainbow colors. If a wrong letter is guessed, the guesses remaining is reduced by 1 and logged to the screen.

### Input Validation

![App Gif-3](/assets/media/word-guess-demo3.gif)

Users cannot input multiple letters at once or any non-alphabetic character. the *Inquirer* node package handles validation through the `validate` propery, which performs a custom function. Here we use an if statement to check for multiple characters, and then proceed to an alphabetic-only regex. An error statement is returned if an invalid character is entered. upper or lowercase input is allowed and correctly converted. 

### Installation
1. Check if Node.js is installed by typing `node -v` into terminal or command prompt (or follow this [tutorial](https://www.youtube.com/watch?v=qZQmCfkmbNA))
2. Clone or Download CLI-Word-Guess respository
3. Open terminal or command prompt and navigate to the root folder, i.e. (`cd C:\Users\...\Desktop\CLI-Word-Guess`)
4. Install node_module dependencies by typing `npm i` or `npm install`
5. Open a terminal at root folder of CLI-Word-Guess
6. Type `node index`
7. Enter a letter on your keyboard and press enter to guess letters
