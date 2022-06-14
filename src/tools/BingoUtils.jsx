import { BingoLayout } from "../data/BingoLayout";
import { Predictions } from "../data/Predictions";

export const GenerateNewBingoCard = () => {

  let predictions = [...Predictions];
  let layout = {...BingoLayout};

  /** NEW METHOD */
  // Iterate through all of the cells in the copied layout.
  Object.keys(layout).forEach(cell => {
    // Handle Free Space
    if (cell === 'c3') {
      layout[cell] = {
        name: 'Free Space',
        stamped: true,
      }
      return;
    };

    // Build a list of possible appearances.
    let possiblePicks = [];
    layout[cell].forEach(data => {
      if (data === 'any') {
        possiblePicks = [...possiblePicks, ...predictions];
      } else {
        possiblePicks = [...possiblePicks, ...predictions.filter(pred => pred.canAppearIn.includes(data))];
      }
    })

    // Get the random index.
    const index = Math.floor(Math.random() * possiblePicks.length);
    const pick = {...possiblePicks[index]};

    // Remove the item.
    predictions.splice(pick, 1);

    // Set the pick.
    let { name } = pick;
    layout[cell] = { name, stamped: false };
  })

  window.dataLayer.push({"issue_new_card": { value: JSON.stringify(layout)}});

  return layout;
 
}