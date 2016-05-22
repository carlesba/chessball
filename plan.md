# Models
Chip ()
 - chipId
 - position
 - owner
 - role
 - ownedPositions: [position…]

Game ()
 - turn
 - turnOwner
 - players: [player1, player2]
 - score: [score1, score2]
 - passCounter


# Selectors
calculateMovements (chips, selectedChipId) : selectedTiles
selectableChips (chips, gameStatus)

# Actions
selectChip(chipId)
dropSelectedChip()

# Reducers
chips: [chip…]
tiles: [tile…]
score: [0, 0]
