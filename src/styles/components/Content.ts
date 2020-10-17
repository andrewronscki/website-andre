import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ContainerContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  background: linear-gradient(#333, #0E0E10);
`;

export const Content = styled.ul`
  margin-top: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1200px;

  li + li {
    margin-left: 32px;
  }
`;

export const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  strong {
    margin-top: 16px;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #f1f1f1;
  }

  p {
    margin-top: 8px;
    text-align: center;
    font-weight: 300;
    font-size: 18px;
    color: #f1f1f1;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 720px;
  margin-bottom: 48px;
`;

export const SocialContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    display: flex;
    justify-content: center;
    align-items: center;

    :hover{
      -webkit-transform: scale(1.2);
      -ms-transform: scale(1.2);
      transform: scale(1.2);
      -webkit-transition: all 0.5s ease-in-out;
      -moz-transition: all 0.5s ease-in-out;
      -o-transition: all 0.5s ease-in-out;
      transition: all 0.5s ease-in-out;
    }

    + li {
      margin-left: 16px;
    }
  }
`;

export const DeveloperContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 18px;
    font-weight: 400;
    color: #f1f1f1;
  }
`;

export const Experiences = styled.div`
  margin: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 960px;
`;
export const ExperienceContent = styled.div`
  display: flex;
  flex-direction: row;
  
  + div {
    margin-top: 48px;
  }
`;
export const ImageExperience = styled.div`
  width: 100%;
  animation: ${appearFromLeft} 1s;
`;
export const DescriptionExperience = styled.div`
  animation: ${appearFromLeft} 1s;
  h1 {
    color: #EA2845;
    margin-bottom: 16px;
  }

  div {
    margin-bottom: 16px;
  }
  width: 100%;
`;

export const Technologies = styled.div`
  width: 100%;
  max-width: 960px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;

  h1 {
    margin-bottom: 48px;
  }
`;
export const ContainerTech = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
export const Tech = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 8px;
  animation: ${appearFromLeft} 1s;

  span {
    margin-top: 8px;
  }

  + div {
    margin-left: 32px;
  }
`;

export const ContactMe = styled.div`
  margin: 32px 0 100px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;
export const ContactImage = styled.div`
  display: flex;
  width: 100%;
  animation: ${appearFromLeft} 1s;
`;
export const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${appearFromLeft} 1s;
    
    img {
      margin-right: 16px;
    }

    a {
      color: #f1f1f1;
      text-decoration: none;
      transition: color 0.5s;

      :hover {
        color: ${shade(0.3, '#f1f1f1')};
      }
    }

    + div {
      margin-top: 36px;
    }
  }

 
`;