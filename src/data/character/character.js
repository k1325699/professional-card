export const player = {
  health: 15,
  defense: 0,
  maxEnergy: 3,
  photo:
    "https://truth.bahamut.com.tw/s01/201911/f2d8ffcb17c05f79b40aec9eaeb63e0b.JPG?w=1000",
};
export const enemy = {
  health: 15,
  defense: 5,
  photo:
    "https://truth.bahamut.com.tw/s01/201810/ada04797632967a98d35a923a36abca0.JPG?w=1000",
  actionOrders: [
    { action: "attack", effect: 5 },
    { action: "defense", effect: 3 },
  ],
};
