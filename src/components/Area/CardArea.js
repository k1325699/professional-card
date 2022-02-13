import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import { CharacterContext } from "../../context";
import { sword, shield } from "../../data/skillCard/common";

const CardAreaWarpper = styled.div`
  height: 50%;
`;
const CardInfoWrapper = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Energy = styled.p`
  font-size: 24px;
  margin-right: 20px;
`;

const ChangeSpan = styled.span`
  color: red;
`;
const Bold = styled.span`
  font-weight: 600;
`;
const UnusedCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  font-size: 24px;
  width: 40px;
  height: 40px;
  color: #fff;
`;
const UsedCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  font-size: 24px;
  width: 40px;
  height: 40px;
  color: #fff;
  margin-right: 20px;
`;
const ChangeRoundButton = styled.button`
  border: none;
  width: 120px;
  padding: 5px 0px;
  font-size: 20px;
  border-radius: 8px;
  background: purple;
  color: #fff;
  cursor: pointer;
  transition: all.2s;
  &:active {
    transform: translateY(2px);
  }
`;
const CardContextWarpper = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
export default function CardArea({ init, setInit }) {
  const { player, setPlayer, enemy, setEnemy, enemyAction, setEnemyAction } =
    useContext(CharacterContext);
  const [cards, setCards] = useState([]);
  const [useCards, setUseCards] = useState([]);
  const [unuseCards, setUnuseCards] = useState([]);
  const [useCardNumber, setUseCardNumber] = useState(0);
  const [unuseCardNumber, setUnuseCardNumber] = useState(0);
  const [energy, setEnergy] = useState(player.maxEnergy);
  const [round, setRound] = useState("player");
  useEffect(() => {
    const initialCard = [
      sword,
      sword,
      sword,
      sword,
      shield,
      shield,
      shield,
      sword,
      sword,
      sword,
      sword,
      shield,
      shield,
      shield,
    ];
    let current = initialCard;
    let randomUnuseCard = [];
    while (current.length > 0) {
      let random = Math.floor(Math.random() * current.length);
      randomUnuseCard.push(current[random]);
      current.splice(random, 1);
    }
    setCards(randomUnuseCard.splice(0, 5));
    setUnuseCardNumber(randomUnuseCard.length);
    setUnuseCards(randomUnuseCard);
  }, [init]);
  useEffect(() => {
    if (round === "enemy") {
      let enemyNowAction = enemy.actionOrders[enemyAction];
      if (enemyNowAction.action === "attack") {
        const { health, defense } = hurtedChange(player, enemyNowAction.effect);
        setPlayer({ ...player, health, defense });
      }
      if (enemyNowAction.action === "defense") {
        setEnemy({
          ...enemy,
          defense: Number(enemy.defense) + enemyNowAction.effect,
        });
      }
      if (enemyAction === enemy.actionOrders.length - 1) {
        setEnemyAction(0);
      } else {
        setEnemyAction(enemyAction + 1);
      }
      setRound("player");
      setEnergy(player.maxEnergy);
      if (unuseCards.length >= 5) {
        setCards(unuseCards.filter((card, index) => index < 5));
        setUnuseCardNumber(
          unuseCards.filter((card, index) => index >= 5).length
        );
        setUnuseCards(unuseCards.filter((card, index) => index >= 5));
      } else {
        let randomCard = [];
        let current = useCards;
        while (current.length > 0) {
          let random = Math.floor(Math.random() * current.length);
          randomCard.push(current[random]);
          current.splice(random, 1);
        }
        setCards([
          ...unuseCards,
          ...randomCard.splice(0, 5 - unuseCards.length),
        ]);
        setUnuseCardNumber(randomCard.length);
        setUnuseCards(randomCard);
        setUseCardNumber(0);
        setUseCards([]);
      }
    }
  }, [round, player, enemy, enemyAction, setEnemyAction, setPlayer, setEnemy]);
  useEffect(() => {
    if (init) {
      setCards([]);
      setUseCards([]);
      setUnuseCards([]);
      setUseCardNumber(0);
      setUnuseCardNumber(0);
      setEnergy(player.maxEnergy);
      setRound("player");
      setInit(false);
    }
  }, [setInit, init, player.maxEnergy]);
  const hurtedChange = (character, attack) => {
    let health = character.health;
    let defense = character.defense;
    if (defense === 0) {
      health -= attack;
      return { health, defense };
    }
    if (defense - attack >= 0) {
      defense -= attack;
      return { health, defense };
    }
    if (defense - attack < 0) {
      health = health - attack + defense;
      defense = 0;
      return { health, defense };
    }
  };
  const energyLessThanCard = (card) => {
    if (energy < card.energy) {
      return true;
    }
    return false;
  };
  const handleChangeRound = () => {
    setUseCards([...useCards, ...cards]);
    setCards([]);
    setUseCardNumber(useCardNumber + cards.length);
    setRound("enemy");
  };
  const handleUse = (card, target) => {
    const runOut = energyLessThanCard(card);
    if (runOut) {
      return;
    }
    if (card.name === "劍") {
      const { health, defense } = hurtedChange(enemy, card.attack);
      setEnergy(energy - card.energy);
      setEnemy({ ...enemy, health, defense });
    }
    if (card.name === "盾") {
      setEnergy(energy - card.energy);
      setPlayer({ ...player, defense: player.defense + card.defense });
    }
    setUseCards([...useCards, cards[target]]);
    setUseCardNumber(useCardNumber + 1);
    setCards(cards.filter((card, index) => index !== target));
  };
  return (
    <CardAreaWarpper>
      <CardInfoWrapper>
        <Flex>
          <Energy>
            <ChangeSpan>{energy}</ChangeSpan>/<Bold>{player.maxEnergy}</Bold>
          </Energy>
          <UnusedCard>{unuseCardNumber}</UnusedCard>
        </Flex>
        <Flex>
          <UsedCard>{useCardNumber}</UsedCard>
          <ChangeRoundButton onClick={handleChangeRound}>
            回合結束
          </ChangeRoundButton>
        </Flex>
      </CardInfoWrapper>
      <CardContextWarpper>
        {cards.map((card, index) => (
          <Card
            handleUse={handleUse}
            card={card}
            energy={energy}
            key={index}
            index={index}
          />
        ))}
      </CardContextWarpper>
    </CardAreaWarpper>
  );
}
