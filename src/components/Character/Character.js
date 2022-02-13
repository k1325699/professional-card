import styled from "styled-components";

const CharacterWrapper = styled.div`
  position: relative;
  width: 30%;
`;
const CharacterPhoto = styled.div`
  height: 100%;
  background: url(${(props) => props.img});
  background-size: cover;
`;
const CharacterCommon = styled.p`
  position: absolute;
  color: #fff;
  font-size: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
const CharacterHealth = styled(CharacterCommon)`
  position: absolute;
  color: #fff;
  top: 5px;
  left: 5px;
  background: red;
`;
const CharacterDefense = styled(CharacterCommon)`
  top: 5px;
  right: 5px;
  background: blue;
`;
const CharacterAction = styled(CharacterCommon)`
  top: 50%;
  right: 5px;
  color: #fff;
  border-radius: 0%;
  background: ${(props) => (props.type === "attack" ? "red" : "blue")};
`;
export default function Character({ photo, health, defense, action }) {
  return (
    <CharacterWrapper>
      <CharacterPhoto img={photo} />
      <CharacterHealth>{health}</CharacterHealth>
      <CharacterDefense>{defense}</CharacterDefense>
      {action && (
        <CharacterAction type={action.action}>{action.effect}</CharacterAction>
      )}
    </CharacterWrapper>
  );
}
