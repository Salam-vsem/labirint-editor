import styled from "styled-components";

export const Item = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover > span {
    opacity: 0.7;
  }

  &:hover > div {
    opacity: 1;
  }
`;

export const HoverPlate = styled.span`
	position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
	display: block;
	z-index: 2;
	width: 100%;
	height: 100%;
  opacity: 0;
  background: black;
	transition: opacity 0.3s ease;
`;

export const Image = styled.img`
  width: 30vw;
  height: 30vw;
  z-index: 1;
  display: block;
`;

export const Title = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  font-weight: 700;
  /* right: 50%; */
  /* top: 0; */
  /* display: none; */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  color: #fff;
`;