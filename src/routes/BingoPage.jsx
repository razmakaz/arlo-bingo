import { useContext } from "react"
import { AppState } from "../App"
import { BingoCard } from "../components/ui/bingo/BingoCard";
import { StartForm } from "../components/ui/bingo/StartForm"

export const BingoPage = () => {

  const [state, setState] = useContext(AppState);

  return (
    <>
      {/* <StartForm active={!state.bingoCard?.name} /> */}
      {state.bingoCard && <BingoCard />}
    </>
  )
}