import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { myProgress } from "../../atoms";

const List = styled.div`
  border-bottom: 1px solid black;
  padding: 0.5rem 0.3rem;
  margin: 0.5rem 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;
const Btn = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  margin-right: 5px;
  box-shadow: ${(props) => props.theme.flatShadow};
  cursor: pointer;
`;

interface IMyprogressSet {
  goal: any;
  key: number;
}

const MyprogressSet = ({ goal }: IMyprogressSet) => {
  const [atomGoals, setAtomGoals] = useRecoilState(myProgress);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { className },
    } = e;
    if (className.includes("delete")) {
      console.log("삭제");
      console.log(goal);
      console.log(goal.id);
    } else {
      console.log("완.요");
    }
  };
  return (
    <List>
      <li key={goal.id}>{goal.goal}</li>
      <Buttons>
        <Btn
          onClick={onClick}
          className="delete"
          style={{ backgroundColor: "#e74c3c" }}
        ></Btn>
        <Btn
          onClick={onClick}
          className="complete"
          style={{ backgroundColor: "#2ecc71" }}
        ></Btn>
      </Buttons>
    </List>
  );
};
export default MyprogressSet;
