import styled from "styled-components";

const CardWrapper = styled.div`
  width: 200px;
  height: 99%;
  position: relative;
  padding: 10px;
  background: #000;
  transform: translateY(50%);
  transition: 0.5s;
  & + & {
    margin-left: 3px;
  }
  &:hover {
    transform: translateY(0);
  }
`;

const CardAttack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 10px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  font-weight: 600;
  color: white;
  border-radius: 50%;
  background: red;
`;
const CardDefense = styled(CardAttack)`
  background: blue;
`;
const CardEnergy = styled(CardAttack)`
  background: yellow;
  color: ${(props) => (props.less ? "#000" : "red")};
  left: 10px;
`;
const CardName = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  height: 10%;
  color: #fff;
`;
const CardPhote = styled.div`
  background-color: #fff;
  background-image: url(${(props) => props.photo});
  height: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center, center;
`;
const CardDescription = styled.p`
  height: 35%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  margin: 10px 10px 0px 10px;
  padding: 10px 10px;
  font-size: 18px;
`;
export default function Card({ handleUse, card, energy, index }) {
  const handleCardData = () => {
    handleUse(card, index);
  };
  return (
    <CardWrapper onClick={handleCardData}>
      {card.attack && <CardAttack>{card.attack}</CardAttack>}
      {card.defense && <CardDefense>{card.defense}</CardDefense>}
      <CardEnergy less={energy >= card.energy}>{card.energy}</CardEnergy>
      <CardName>{card.name}</CardName>
      <CardPhote photo={card.photo} />
      <CardDescription>{card.description}</CardDescription>
    </CardWrapper>
  );
}
