import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLabirintStore } from '../../store/Labirint';
import { observer } from 'mobx-react-lite';
import { SelectedItemToChange } from '../../types';

interface ItemStyledProps {
  bgColor: string;
  width?: number;
}

const ItemStyle = styled.div<ItemStyledProps>`
  position: relative;
  width: ${props => props.width? props.width + 'px': '80px'};
  height: 80px;
  margin-bottom: 20px;
  /* border-radius: 100%; */
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  &:hover > span {
    opacity: 0.3;
  }

  &:hover > div {
    opacity: 1;
  }
`;

export const Title = styled.div`
  position: absolute;
  font-size: 16px;
  bottom: -20%;
  /* width: 100%; */
  /* height: 100%; */
  /* border-radius: 100%; */
  /* text-align: start; */
  /* right: 50%; */
  /* top: 0; */
  /* display: none; */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
  color: #fff;
`;

const Image = styled.img`
  width: 40px;
  display: block;
`;

interface DescriptionProps {
  display: string;
  leftInPercentage?: number
}
const Description = styled.div<DescriptionProps>`
  position: absolute;
  border-radius: 5px;
  top: 100%;
  left: ${props => props.leftInPercentage? `-${props.leftInPercentage}%`: '-405%'};
  width: 300px;
  /* height: 350px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #191919;
  display: ${props => props.display};
`;

const Player = styled.video`
  /* position: absolute; */
  border-radius: 5px 5px 0 0;
  width: 300px;
  /* height: 90%; */
  /* top: 0; */
  /* left: 0; */
`;

const VideoDescription = styled.div`
  width: 100%;
  height: 60px;
  padding: 5px 0px 0px 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  /* z-index: 999; */
`;

const HoverPlate = styled.span`
	position: absolute;
  /* border-radius: 100%; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
	display: block;
	z-index: 1;
	width: 100%;
	height: 100%;
  opacity: 0;
  background: black;
	transition: opacity 0.3s ease;
  cursor: pointer;
`;

export interface VideoDescriptionProps {
  title: string,
  description: string,
}
interface ItemProps {
  value?: number;
  img: string;
  title: string;
  width?:number;
  videotitle?: string
  videoDescription?: VideoDescriptionProps
  discrLeftPos?: number;
  onClickFunc?: () => void;
}

export const Item: React.FC<ItemProps> = observer((props) => {
  const {value, img, width, onClickFunc, videotitle, videoDescription, discrLeftPos} = props;
  const store = useLabirintStore();
  const bgVideo = `${process.env.PUBLIC_URL}/video/${videotitle}.mp4`;
  const videoRef = useRef<HTMLVideoElement>(null);

  const [bg, setBg] = useState('#e631f9');
  const [show, setShow] = useState('none');
  const [timer, setTimer] = useState<number>();

  const start = () => {
    const timer = setTimeout(() => {
      setShow('inherit');
      videoRef.current!.play();
      videoRef.current!.loop = true;
    }, 1500);
    setTimer(timer);
  };

  // videoRef.current!.addEventListener('ended', () => {
  //   console.log('here');
  //   videoRef.current!.currentTime = 0;
  //   videoRef.current!.play();
  // }, false);

  const stop = () => {
    setShow('none');
    clearTimeout(timer);
    videoRef.current!.currentTime = 0;
  };

  const playAgain = () => {
    videoRef.current!.currentTime = 0;
    videoRef.current!.play();
  }

  useEffect(() => {
    updateColor()
  }, [store.selectedItemToChange]);

  const updateColor = () => {
    if(value) {
      if(store.selectedItemToChange === value && bg === '#e631f9') {
        setBg('#4eeae4');
      }
      else {
        setBg('#e631f9');
      }
    }
  }

  const updateSelectedItem = () => {
    if(value) {
      if(store.selectedItemToChange === value) {
        store.selectedItemToChange = SelectedItemToChange.noneSelected;
      }
      else {
        store.selectedItemToChange = value;
      }
    }
  }

  return (
    <>
      <ItemStyle
        onClick={() => {
          videoDescription && stop();
          onClickFunc ? onClickFunc(): updateSelectedItem();
        }}
        bgColor={bg}
        onMouseEnter={videoDescription && start}
        onMouseLeave={videoDescription && stop}
        width={width}
      >
        {
          videoDescription &&
          <Description display={show} leftInPercentage={discrLeftPos}>
            <Player
              onEnded={playAgain}
              ref={videoRef}
              src={bgVideo}
            />
            <VideoDescription>
              <span><b>{videoDescription.title}</b><br />
              {videoDescription.description}</span>
            </VideoDescription>
          </Description>
        }
        <Image src={img}/>
        <HoverPlate />
      </ItemStyle>
    </>
  );
});

export default Item;