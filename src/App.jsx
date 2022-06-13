import { createContext, useEffect, useState } from "react"
import styled from "styled-components"
import { MainLayout } from "./components/layout/MainLayout"
import { MainLoader } from "./components/ui/loaders/MainLoader"
import { IntroModal } from "./components/ui/modal/IntroModal"
import { BingoPage } from "./routes/BingoPage"
import { FAQPage } from "./routes/FAQPage"
import { InitializeBingoCard, LoadBingoConfig } from "./tools/DataUtils"

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: var(--surface-a);
  overflow-x: hidden;
`

const DefaultConfig = {
  disableIntroModal: false,
}

export const AppState = createContext();

export const App = () => {

  const [state, setState] = useState({
    initialized: false,
    loading: true,
    showingIntroModal: true,
    config: DefaultConfig,
    bingoCard: null,
    page: 'bingo',
  });

  useEffect(() => {
    let config = LoadBingoConfig() ?? DefaultConfig;
    setState({ 
      ...state,  
      bingoCard: InitializeBingoCard(),
      config,
      initialized: true,
      loading: false,
      showingIntroModal: !config.disableIntroModal,
    });

  }, [])

  return (
    <AppState.Provider value={[state, setState]}>
      <MainLoader />
      <Container>
        <MainLayout>
          {state.page === 'bingo' && <BingoPage />}
          {state.page === 'faq' && <FAQPage />}
        </MainLayout>
        <IntroModal />
      </Container>
    </AppState.Provider>
  )
}