import { useContext } from "react";
import styled from "styled-components";
import { CharacterContext } from "../../context";
import Character from "../Character/Character";

const CharacterAreaWrapper = styled.div`
  height: 50%;
  display: flex;
  justify-content: space-around;
`;

export default function CharacterArea() {
  const { player, enemy, enemyAction } = useContext(CharacterContext);
  return (
    <CharacterAreaWrapper>
      <Character
        photo={player.photo}
        health={player.health}
        defense={player.defense}
      />
      <Character
        photo={enemy.photo}
        health={enemy.health}
        defense={enemy.defense}
        action={enemy.actionOrders[enemyAction]}
      />
    </CharacterAreaWrapper>
  );
}
