import { useForm } from "react-hook-form";
import styled from "styled-components";

const FormBox = styled.div`
  height: 40%;
  width: 60%;
  background-color: rgb(255, 255, 255, 0.7);
  border: 0.5px solid ${(props) => props.theme.colors.buttonColor};
  box-shadow: ${(props) => props.theme.bigShadow};

  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 50%;

    input {
      width: 90%;
      height: 60%;
      border: 1px solid ${(props) => props.theme.colors.buttonColor};
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 5px;
      width: 90%;
      margin-top: 8px;
      border: none;
      outline: none;
      background-color: ${(props) => props.theme.colors.buttonColor};
      color: white;
      cursor: pointer;
    }
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  outline: none;
  color: white;
  background-color: ${(props) => props.theme.colors.buttonColor};
  cursor: pointer;
`;

interface IInputBoard {
  closeFormBtn: any;
  submitForm: any;
  formName: string;
  children: any;
}

const InputBoard = ({ children, closeFormBtn, submitForm }: IInputBoard) => {
  const methods = useForm({});
  submitForm("title");
  return (
    <FormBox>
      <CloseBtn onClick={closeFormBtn}>✖</CloseBtn>
      {children}
    </FormBox>
  );
};

export default InputBoard;
