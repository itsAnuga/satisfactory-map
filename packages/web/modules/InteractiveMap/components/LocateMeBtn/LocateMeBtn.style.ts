import { transparentize } from "polished";
import styled from "../../../../themes/styled";

export const Button = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary500};
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  display: flex;
  font-family: "ibm_plex";
  font-size: 16px;
  /* font-weight: bold; */
  justify-content: center;
  line-height: 20px;
  outline: none;
  padding: 8px;
  transition: background 0.242s ease;
  width: 100%;
  &:hover,
  &focus {
    background: ${({ theme }) => theme.colors.primary700};
  }
`;

export const ModalBody = styled.div`
  color: ${({ theme }) => theme.colors.black};
`;

export const Path = styled.code`
  margin: 8px 0;
  display: block;
  padding: 8px;
  color: black;
  background: ${({ theme }) => transparentize(0.5, theme.colors.black)};
`;

export const Note = styled.p`
  margin: 12px 0 0;
  font-size: 12px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;

  & > button + button {
    margin-left: 8px;
  }
`;
