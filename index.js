// Math library for using Matrices and Modules
const math = require('mathjs')

// Encoded Text
STRING = [
  [['Y'], ['X'], ['S'], ['C']],
  [['M'], ['B'], ['V'], ['T']],
  [['J'], ['Y'], ['I'], ['B']],
  [['O'], ['A'], ['T'], ['V']],
  [['K'], ['Z'], ['Z'], ['U']],
  [['Q'], ['X'], ['D'], ['X']],
  [['B'], ['C'], ['Y'], ['X']],
  [['V'], ['S'], ['W'], ['S']],
  [['L'], ['J'], ['B'], ['I']],
  [['B'], ['H'], ['O'], ['L']],
  [['O'], ['D'], ['A'], ['M']],
  [['S'], ['Z'], ['J'], ['S']],
  [['X'], ['J'], ['L'], ['Y']],
  [['E'], ['M'], ['A'], ['Y']],
]

// Alphabet
ABC = 'ZABCDEFGHIJKLMNOPQRSTUVWXY'

// Given Constants
STIN = math.matrix([
  [19, 20],
  [9, 14],
])
BHOL = math.matrix([
  [2, 8],
  [15, 12],
])

NEW = math.matrix([
  [0, 0],
  [0, 0],
])

complete = false

// Constraints
const MAX_VALUE = 25
const MIN_VALUE = 0
const INCREMENT = 1

// Starting Matrix [[0 0], [0 0]]
let a = (b = c = d = MIN_VALUE)

let multiplier = 0

while (a <= MAX_VALUE || complete) {
  while (b <= MAX_VALUE || complete) {
    while (c <= MAX_VALUE || complete) {
      while (d <= MAX_VALUE || complete) {
        // Test abcd matrix by multiplying it by STIN and applying mod 26
        NEW = math.multiply(
          math.matrix([
            [a, b],
            [c, d],
          ]),
          STIN
        )
        NEW = math.mod(NEW, 26)

        // Check if the resulting matrix equals BHOL
        if (
          BHOL._data[0][0] == NEW._data[0][0] &&
          BHOL._data[0][1] == NEW._data[0][1] &&
          BHOL._data[1][0] == NEW._data[1][0] &&
          BHOL._data[1][1] == NEW._data[1][1]
        ) {
          // The attempt was successful
          console.log('Result Found')

          ANSWER = ''

          // Apply encryption matrix to each 4 letter block
          STRING.forEach((word, index) => {
            // Get matrix from encoded text
            MAT = math.matrix([
              [ABC.indexOf(word[0][0]), ABC.indexOf(word[1][0])],
              [ABC.indexOf(word[2][0]), ABC.indexOf(word[3][0])],
            ])

            // Find the determent of the deciphering matrix
            if (multiplier === 0) {
              for (var i = 1; i <= 26; i++) {
                if (math.mod(a * d - b * c * i, 26) === 1) {
                  i = 27
                  multiplier = i
                }
              }
            }

            // Multiply the inverse of the deciphering matrix by the encoded text matrix
            RESULT = math.mod(
              math.multiply(
                math.multiply(
                  multiplier,
                  math.matrix([
                    [d, -b],
                    [-c, a],
                  ])
                ),
                MAT
              ),
              26
            )

            // Add the result to the decoded string
            ANSWER +=
              ABC[Math.floor(RESULT._data[0][0])] +
              ABC[Math.floor(RESULT._data[0][1])] +
              ABC[Math.floor(RESULT._data[1][0])] +
              ABC[Math.floor(RESULT._data[1][1])]
          })

          // Output the result and encoding matrix
          console.log(ANSWER)
          console.log(a, b, c, d)

          complete = true
          break
        }
        d += INCREMENT
      }
      d = 0
      c += INCREMENT
    }
    c = 0
    b += INCREMENT
  }
  b = 0
  a += INCREMENT
}

!complete && console.log('No Result Found.')
