import { useState, useEffect, useRef, FC } from "react";
import styled from "styled-components";
import useWindowDimensions from "../../utils/useWindowDimension";

const StyledCarouselContainer = styled.div`
  position: relative;
`;

const MainDiv = styled.div<{ itemHeight: number }>`
  height: ${({ itemHeight }) => itemHeight}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const Button = styled.button`
  position: absolute;
  font-size: 30px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  margin-left: 16px;
  right: 8px;
  :first-of-type {
    left: 8px;
    right: auto;
    margin-right: 16px;
    margin-left: 0;
    z-index: 1;
  }

  @media only screen and (min-width: 500px) {
    position: relative;
  }
`;

interface ICarousel {
  widthOfItems: number;
}

const CarouselDiv = styled.div<ICarousel>`
  position: relative;
  overflow: hidden;
  height: 100%;
  flex: 2;
  max-width: ${(props) => props.widthOfItems}px;
`;

interface ICarouselSlider {
  transitionValue: number;
}

const CarouselSlider = styled.div<ICarouselSlider>`
  position: relative;
  height: 100%;
  transform: translateX(${(props) => props.transitionValue}px);
  transition: transform 0.45s cubic-bezier(0.455, 0.03, 0.515, 0.955);
`;

const StyledCarousel = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  height: 100%;
`;

const StyledDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 15px;
  width: 100%;
`;

const SingleDot = styled.div<{ colorBG: boolean }>`
  width: 6px;
  height: 6px;
  background: ${({ colorBG }) => (colorBG ? "#333" : "#dddddd")};
  border: 1px solid #333;
  margin: 0 2px;
  border-radius: 50%;
  @media only screen and (min-width: 800px) {
    width: 8px;
    height: 8px;
  }
`;

const StyledH3Container = styled.div<{ width: number }>`
  max-width: ${({ width }) => width}px;
  margin: 0 auto 8px;
  @media only screen and (min-width: 800px) {
    margin: 0 auto 16px;
  }
`;

const StyledH3 = styled.h3<{ width: number }>`
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  color: #333;
  @media only screen and (min-width: 800px) {
    font-size: 20px;
    line-height: 32px;
  }
`;

type CarouselState = {
  noOfItems: number;
  widthOfItems: number;
  currentItem: number;
  transitionValue: number;
  itemWidth: number;
};

type CarouselProps = {
  heading: string;
};

const Carousel: FC<CarouselProps> = ({ heading }) => {
  const items = [
    {
      name: "Alexa",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/alexa.jpg",
    },
    {
      name: "camera",
      description: "Very very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/camera.png",
    },
    {
      name: "laptop",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/laptop1.png",
    },
    {
      name: "remote",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/remote.jpeg",
    },
    {
      name: "Alexa",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/alexa.jpg",
    },
    {
      name: "camera",
      description: "Very very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/camera.png",
    },
    {
      name: "laptop",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/laptop1.png",
    },
    {
      name: "remote",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/remote.jpeg",
    },
    {
      name: "Alexa",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/alexa.jpg",
    },
    {
      name: "camera",
      description: "Very very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/camera.png",
    },
    {
      name: "laptop",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/laptop1.png",
    },
    {
      name: "remote",
      description: "Very nice",
      price: 19.99,
      quantity: 1,
      image: "/images/remote.jpeg",
    },
  ];
  const [state, setState] = useState<CarouselState>({
    noOfItems: -1,
    widthOfItems: -1,
    currentItem: 0,
    transitionValue: 0,
    itemWidth: 0,
  });

  const { width } = useWindowDimensions();

  const getCarouselTotalWidth = (width: number, itemWidth: number) => {
    const carouselTotalWidth = (width / 100) * 80;
    let item = Math.floor(carouselTotalWidth / itemWidth);
    item = item > 5 ? 5 : item <= 0 ? 1 : item;
    let visibleitems = item * itemWidth;
    return { visibleitems, item };
  };

  useEffect(() => {
    let currentItemWidth = state.itemWidth;
    if (width > 800) {
      currentItemWidth = 250;
    } else {
      currentItemWidth = 300;
    }
    const { item, visibleitems } = getCarouselTotalWidth(
      width,
      currentItemWidth
    );
    setState((prev) => ({
      ...prev,
      widthOfItems: visibleitems,
      noOfItems: item,
      currentItem: item - 1,
      itemWidth: currentItemWidth,
    }));
  }, []);

  // 200 is width of item being used
  useEffect(() => {
    let currentItemWidth = state.itemWidth;
    if (width > 800) {
      currentItemWidth = 250;
    } else {
      currentItemWidth = 300;
    }
    const { item, visibleitems } = getCarouselTotalWidth(
      width,
      currentItemWidth
    );
    setState((prev) => ({
      ...prev,
      widthOfItems: visibleitems,
      noOfItems: item,
      itemWidth: currentItemWidth,
    }));
  }, [width, state.itemWidth]);

  const next = () => {
    let val = state.currentItem;
    let transitionVal = state.transitionValue;
    if (val !== items.length - 1) {
      val = val + 1;
      transitionVal -= state.itemWidth;
    }
    setState((prev) => ({
      ...prev,
      currentItem: val,
      transitionValue: transitionVal,
    }));
  };

  const prev = () => {
    let val = state.currentItem;
    let transitionVal = state.transitionValue;
    if (val > state.noOfItems - 1) {
      val = val - 1;
      transitionVal += state.itemWidth;
    }
    setState((prev) => ({
      ...prev,
      currentItem: val,
      transitionValue: transitionVal,
    }));
  };

  return (
    <StyledCarouselContainer>
      <StyledH3Container width={state.widthOfItems}>
        <StyledH3 width={state.widthOfItems}>{heading}</StyledH3>
      </StyledH3Container>
      <MainDiv itemHeight={state.itemWidth}>
        <Button onClick={prev}>{"<"}</Button>
        <CarouselDiv widthOfItems={state.widthOfItems}>
          <CarouselSlider transitionValue={state.transitionValue}>
            <StyledCarousel>
              {items.map((item: any, i: number) => {
                return (
                  <Item
                    itemWidth={state.itemWidth}
                    key={i}
                    itemDetails={item}
                  />
                );
              })}
            </StyledCarousel>
          </CarouselSlider>
        </CarouselDiv>
        <Button onClick={next}>{">"}</Button>
      </MainDiv>
      <StyledDots>
        {items.map((item: any, i: number) => {
          return (
            <SingleDot
              key={i}
              colorBG={
                i > Math.max(state.currentItem - state.noOfItems, -1) &&
                i <= state.currentItem
              }
            />
          );
        })}
      </StyledDots>
    </StyledCarouselContainer>
  );
};

interface IProps {
  itemDetails: any;
  itemWidth: number;
}

const StyledItem = styled.div<{ itemWidth: number }>`
  background: #fff;
  width: ${({ itemWidth }) => itemWidth}px;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const StyledItemImage = styled.img`
  max-width: 100%;
  height: auto;
  flex: 1;
`;

const StyledItemTitle = styled.h4`
  font-size: 16px;
  padding: 4px;
  text-transform: capitalize;
`;

const Item: React.FC<IProps> = ({ itemDetails, itemWidth }) => {
  return (
    <StyledItem itemWidth={itemWidth}>
      <StyledItemTitle>{itemDetails.name}</StyledItemTitle>
      <StyledItemImage src={itemDetails.image} alt="nope" />
    </StyledItem>
  );
};

export default Carousel;
