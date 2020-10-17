import styled from 'styled-components';
import background from '@/assets/background.png';

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  background: url(${background});
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow-x: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  h1 {
    font-weight: 700;
    font-size: 32px;
    color: #f1f1f1;
  }

  p {
    margin-top: 8px;
    font-weight: 400;
    font-size: 18px;
    color: #f1f1f1;
  }
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: solid #EA2845 2px;
  margin: 40px 0;
`;

export const IconContainer = styled.ul`
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 960px;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    
    a {
      display: flex;
      justify-content: center;
      align-items: center;

      :hover {
        -webkit-transform: scale(1.2);
        -ms-transform: scale(1.2);
        transform: scale(1.2);
        -webkit-transition: all 0.5s ease-in-out;
        -moz-transition: all 0.5s ease-in-out;
        -o-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
      }
    }

    + li {
      margin-left: 56px;
    }
  }

  
`;

