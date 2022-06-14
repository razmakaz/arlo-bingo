export const BingoWinGrid = {
  // Horizontal Wins
  h1: ['a1', 'b1', 'c1', 'd1', 'e1'],
  h2: ['a2', 'b2', 'c2', 'd2', 'e2'],
  h3: ['a3', 'b3', 'c3', 'd3', 'e3'],
  h4: ['a4', 'b4', 'c4', 'd4', 'e4'],
  h5: ['a5', 'b5', 'c5', 'd5', 'e5'],

  // Vertical Wins
  v1: ['a1', 'a2', 'a3', 'a4', 'a5'],
  v2: ['b1', 'b2', 'b3', 'b4', 'b5'],
  v3: ['c1', 'c2', 'c3', 'c4', 'c5'],
  v4: ['d1', 'd2', 'd3', 'd4', 'd5'],
  v5: ['e1', 'e2', 'e3', 'e4', 'e5'],

  // Diagonal Wins
  d1: ['a1', 'b2', 'c3', 'd4', 'e5'],
  d2: ['e1', 'd2', 'c3', 'b4', 'a5'],

  // Blackout Win
  bo: [
    'a1', 'b1', 'c1', 'd1', 'e1',
    'a2', 'b2', 'c2', 'd2', 'e2',
    'a3', 'b3', 'c3', 'd3', 'e3',
    'a4', 'b4', 'c4', 'd4', 'e4',
    'a5', 'b5', 'c5', 'd5', 'e5',
  ]
}