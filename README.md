# Minesweeper
Ever since I discovered minesweeper on my first windows 95 computer I have been fascinated by the game. At first just playing it randomly, then understanding the rules and logic, and finally delving deeper and figuring out how it works and how to make it myself.

For the past few years I have used a simple minesweeper app on my phone. However, it has recently begun to display long, obnoxious ads after each game, so I have decided to to take the opportunity to make my own.

# Ideas
- Think about encoding a game state in a link using every bit of each character to represent something
- Terminating and non terminating settings. Non terminating settings can be changed without having to reset the game

# TO DO

- Achievements
  - Achievement for each mode without using any flags
  - Time achievements
  - Finish each type of level
  - One of each difficulty in a row
  - Mines disarmed (100, 1000, 10000)
  - Mines disarmed without flagging them (100, 1000, 10000)
  - **Hidden:**
    - Change non game stopping settings 10 times in 1 game (indecisive)
    - Lose 10 games on the second click (Do you know how to play)
    - Get all other achievements (try hard)
    - +versions of time achievements (easy in under 10s)

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

- Create custom emojis
- Add manifest.json
- Add service worker
- Check whether the user's device is longer length or height wise and set that dimension to be the longer direction.
- Use a store for board settings instead of the nonsense I'm using now
- Add some slight animations to ease lag for times opening and closing
- Should be using canvas to render the board, using svelte and the dom is slooooow

## Bugs
- Active css applied on left click regardless of whether primary action is flag or open
- When primary action is flag left clicking on numbers no longer does what it is supposed to
- Some sizes still overflow. Resize window on easy to reproduce