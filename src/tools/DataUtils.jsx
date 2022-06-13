import { GenerateNewBingoCard } from "./BingoUtils";

const StorageKey = 'arlo-2022-';
const BingoCard = StorageKey+'bingo-card';
const BingoConfig = StorageKey+'bing-config';

export const InitializeBingoCard = () => {
  let data = LoadBingoCard();
  if (!data) {
    data = {
      name: '',
      bingoCard: GenerateNewBingoCard(),
    }
    SaveBingoCard(data);
  }
  return data;
}

export const LoadBingoCard = () => {
  try {
    return JSON.parse(localStorage[BingoCard])
  } catch {
    return null;
  }
};
export const SaveBingoCard = (data) => localStorage[BingoCard] = JSON.stringify(data);

export const ClearBingoCard = () => delete localStorage[BingoCard];

export const LoadBingoConfig = () => {
  try {
    return JSON.parse(localStorage[BingoConfig])
  } catch {
    return null;
  }
};
export const SaveBingoConfig = (data) => localStorage[BingoConfig] = JSON.stringify(data);

export const ClearBingoConfig = () => delete localStorage[BingoConfig];

export const ClearAllData = () =>  {
  ClearBingoCard();
  ClearBingoConfig();
  window.location.reload();
}

window.clearBingoCard = () => localStorage.removeItem(BingoCard);
window.clearBingoConfig = () => localStorage.removeItem(BingoConfig);