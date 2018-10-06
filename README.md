# Minesweeper
Play the classical Minesweeper game made with React and Redux.

# Up and running
## Online
Go to [hdt94.github.io/minesweeper](https://hdt94.github.io/minesweeper/)

## Local
Open a terminal instance at current directory and run:
```
npm i --production
```
```
npm start
```

# Description

## CSS stylesheets
CSS modules are used given the advantages their use. Their configuration is now directly supported by version 2 of `create-react-app`.

## Persistent state
State is serialized and stored with `localStorage` browser API. Thus, game state is preserved even when reloading page or closing the browser.

# Notes
* The use of Redux state manager for this game can be seemed as over-engineered but it was intended to be implemented no matter the scale of the app.