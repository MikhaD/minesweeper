# Minesweeper

Ever since I discovered minesweeper on my first windows 95 computer I have been fascinated by the game. At first just playing it randomly, then understanding the rules and logic, and finally delving deeper and figuring out how it works and how to make it myself.

# Ideas
- Think about encoding a game state in a link using every bit of each character to represent something
- Terminating and non terminating settings. Non terminating settings can be changed without having to reset the game

# TO DO
- Fix mouseup doesndoetrigger if mouse moves out of element
- Fix when game is failed and bombs are shown they are shown on top of tiles

- Add crossed out flag to each flag that doesn't have a bomb underneath
- Ensure that tiles with a question mark also flash when adjacent number is clicked
- When game is won flag all unflagged bombs
- Connect flagged store to the number of flagged tiles
- If the number of flagged tiles === bombs and user tries to flag add questionmark if that is true, else do nothing