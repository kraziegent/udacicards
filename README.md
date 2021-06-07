# udacicards

The project has been tested on `ios` and the `web` to work correctly.

This is project was submitted as the third project for the Udacity React Nanodegree programme, the project is a React Native application which can be run on the web, ios or android.

The App let's you play the Card game, the game is made up of cards with questions and answers to help users study about different topics.

Cards are grouped into decks (topics) which have an infinite number of related cards.

The user can play a quiz on any deck they want, the apps shows the user each card in the deck and the user can guess the answer, then they click on the view answer button to confirm if their guess was right.

After this the user can now mark their guess as either correct or inccorect.

## Setup

To use the application you would have to have npm and yarn installed, the application can be installed as shown below.

### yarn

To use yarn simply type `yarn install` as in above, this will install a project dependencies.

Then run `yarn start` to run the application, visit http://localhost:19006/ to load the expo user interface where you have the choice of either loading the web, android or ios version of the game to start playing.

## Playing the game

### Decks

Here you see all the decks available and the number of cards in each deck.

You can click on the deck to view more information about the deck.

You can also click on the add deck button to add a new deck.

### Add Deck

This is where you add a deck to the app, you can navigate to this page by clicking on the Add Deck tab at the bottom of the page.
 After creating a new deck you will be taken to deck view page.

### Deck View

Here you can add questions (cards) to the deck, start a quiz or delete the deck.

Adding a card to the deck takes you to the add card page where you will be required to enter the question and answer for the card and then submit the card.

Starting a quiz will take you to the quiz page where you are shown the number of answered vs remaining questions, the card question and the option to view the answer and select if your guess was correct or incorrect.

Once you've selected your answer the next card (question) in the deck is loaded untill you've answered all questions in the deck.

On answering all the questions in a deck your score will be displayed and you will be given an option to reset the quiz.
