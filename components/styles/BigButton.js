import styled from 'styled-components';

const BigButton = styled.button`
  background: white;
  color: black;
  font-weight: 500;
  border: 1;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 2rem;
  padding: 0.8rem 1.5rem;
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
  &:hover {
    background: red;
    color: white;
    cursor: pointer;
  }
`;

export default BigButton;
