import { useState, useEffect } from "react";
import {
  player as playerData,
  enemy as enemyData,
} from "../../data/character/character";
import styled from "styled-components";
import CharacterArea from "../Area/CharacterArea";
import CardArea from "../Area/CardArea";
import { CharacterContext } from "../../context";

const Root = styled.div`
  width: 1024px;
  margin: 0 auto;
  margin-top: 30px;
  height: 80vh;
  border: 10px solid #000;
  border-radius: 20px;
`;
const VictoryWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000;
  z-index: 3;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;
const VictoryContent = styled.p`
  padding-bottom: 20px;
`;
const AgainButton = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
  background: purple;
  color: #fff;
  transition: all.2s;
  &:active {
    transform: translateY(2px);
  }
`;

function App() {
  const [victory, setVictory] = useState(false);
  const [player, setPlayer] = useState(playerData);
  const [enemy, setEnemy] = useState(enemyData);
  const [enemyAction, setEnemyAction] = useState(0);
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (player.health <= 0) {
      setVictory("enemy");
      return;
    }
    if (enemy.health <= 0) {
      setVictory("player");
      return;
    }
  }, [player.health, enemy.health]);
  const handleInitialization = () => {
    setVictory(false);
    setPlayer(playerData);
    setEnemy(enemyData);
    setEnemyAction(0);
    setInit(true);
  };
  return (
    <CharacterContext.Provider
      value={{
        player,
        setPlayer,
        enemy,
        setEnemy,
        enemyAction,
        setEnemyAction,
      }}
    >
      <Root>
        {victory && (
          <VictoryWrapper>
            <VictoryContent>{victory} win！</VictoryContent>
            <AgainButton onClick={handleInitialization}>重新開始</AgainButton>
          </VictoryWrapper>
        )}
        <CharacterArea />
        <CardArea init={init} setInit={setInit} />
      </Root>
    </CharacterContext.Provider>
  );
}

export default App;
