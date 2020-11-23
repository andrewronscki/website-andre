import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

  background: linear-gradient(#333, #0E0E10);

  p {
    color: #f1f1f1;
    margin: 32px 0;
    font-weight: 700;
    font-size: 36px;
  }
`;

export const GoHome = styled.a`
  padding: 15px;
  background: #EA2845;
  border-radius: 9px;
  transition: background-color 0.2s;

  :hover {
    background: ${shade(0.2, "#EA2845")};
  }
`;

export const ContainerLocale = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  margin-right: 4rem;

  div {
    cursor: pointer;
  }

  div + div {
    margin-left: 1rem;
  }
`;
