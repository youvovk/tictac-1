export const getWinner = (playerText:string) => {
  if (playerText === "You win!") {
    return "winner-text";
  } else if (playerText === "You lost!") {
    return "loser-text";
  } else {
    return "";
  }
};
interface WinLine {
  type: string;
  position: number;
}
export const getWinLineTypeAndPosition = (winningCombination:number[]) : WinLine => {
  const [a, b, c] = winningCombination;
  if (
    (a === 0 && b === 1 && c === 2) ||
    (a === 3 && b === 4 && c === 5) ||
    (a === 6 && b === 7 && c === 8)
  ) {
    const rowIndex = Math.floor(a / 3);
    return { type: `horisontal-${rowIndex === 0 ? "up" : rowIndex === 1 ? "center" : "down"}`, position: rowIndex };
  } else if (
    (a === 0 && b === 3 && c === 6) ||
    (a === 1 && b === 4 && c === 7) ||
    (a === 2 && b === 5 && c === 8)
  ) {
    const colIndex = a % 3;
    return { type: `vertical-${colIndex === 0 ? "left" : colIndex === 1 ? "center" : "right"}`, position: colIndex };
  } else if (a === 0 && b === 4 && c === 8) {
    return { type: "diagonal-left", position: 0 };
  } else if (a === 2 && b === 4 && c === 6) {
    return { type: "diagonal-right", position: 0 };
  }
  return { type: "", position: 0 };
};