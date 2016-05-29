# Models
Chip ()
 - chipId
 - position
 - owner
 - role
 - selectable
 - isSelected
 - ownedPositions: [position…]

<!-- Game ()
 - turn
 - players: [player1, player2]
 - score: [score1, score2]
 - passCounter -->


# Selectors
calculateMovements (chips, selectedChipId) : selectedTiles
hasBeenGoal(chips): container dispatch score()
<!-- selectableChips (chips, gameStatus) -->

# Actions
selectChip(chipId)
moveSelectedChip(position)
score()

# Reducers
chips: [chip…]
<!-- tiles: [tile…] -->
score: [0, 0]
