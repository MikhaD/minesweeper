# Minesweeper
Ever since I discovered minesweeper on my first windows 95 computer I have been fascinated by the game. At first just playing it randomly, then understanding the rules and logic, and finally delving deeper and figuring out how it works and how to make it myself.

For the past few years I have used a simple minesweeper app on my phone. However, it has recently begun to display long, obnoxious ads after each game, so I have decided to to take the opportunity to make my own.

# Ideas
- Think about encoding a game state in a link using every bit of each character to represent something
- Terminating and non terminating settings. Non terminating settings can be changed without having to reset the game

# TO DO
- Settings menu
  - board size
  - number of bombs
  - question mark
  - primary action
  - Theme
  - Style
  - Bomb generation algorythm

- Stats
  - Best time for each size
  - % won for each size
  - Games played for each size
  - Average time for each size
  - Total time spent playing each size
  - Total time spent playing
  - Total games played
  - Total games won
  - Win %
  - Disarmed mines

- Reset game when emoji clicked
- Create custom emojis
- Align components on top of board correctly
- Create components for the things on top of the board
- Add manifest.json
- Add service worker

## Bugs
- Active css applied on left click regardless of whether primary action is flag or open