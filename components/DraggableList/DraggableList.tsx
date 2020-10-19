import styled from "styled-components";
import ModalPortal from "../Modal/ModalPortal";
import { useState, useEffect, Fragment, useRef } from "react";

const itemHeight = 74;

const StyledItem = styled.li`
  width: 300px;
  height: 70px;
  color: #fff;
  margin-bottom: 4px;
  border: 1px solid black;
  list-style: none;
  cursor: move;
`;

const StyledBg = styled.li`
  width: 300px;
  height: 70px;
  background: #dddddd;
  margin-bottom: 4px;
`;

const StyledUL = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ListItem = ({ children, selector }: any) => {
  return <ModalPortal selector={selector}>{children}</ModalPortal>;
};

let items = [
  "item 1",
  "item 2",
  "item 3",
  "item 4",
  "item 5",
  "item 6",
  "item 7",
];
const positions: { [key: number]: number } = {};
let initialPos = 0;

const DraggableList = () => {
  const [itemState, setItemState] = useState({
    top: 0,
    left: 0,
  });
  const [newListItems, setNewListItems] = useState(() => {
    return items.map((item) => {
      return {
        name: item,
        left: 0,
        pos: 0,
      };
    });
  });
  const [currentItem, setCurrentItem] = useState(-1);
  const [active, setActive] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    let { top } = itemRef.current!.getBoundingClientRect();
    initialPos = top;
  }, []);

  useEffect(() => {
    let newItems = newListItems.slice().map((item, index) => {
      item.pos = Math.round(initialPos + itemHeight * index + itemHeight / 2);
      positions[item.pos] = index;
      return item;
    });
    setNewListItems(newItems);
  }, []);

  useEffect(() => {
    if (active) {
      document.body.addEventListener("mousemove", onMove);
      document.body.addEventListener("mouseup", mouseUp);

      return () => {
        document.body.removeEventListener("mousemove", onMove);
        document.body.removeEventListener("mouseup", mouseUp);
      };
    }
  }, [active, currentItem]);

  const isInRange = (pos: number) => {
    let range = 5;
    for (let i = 0; i <= range; i++) {
      if (
        pos - i >= Math.round(initialPos + itemHeight / 2) &&
        (positions[pos + i] >= 0 || positions[pos - i] >= 0)
      ) {
        return {
          isAbove: true,
          itemIndex: positions[pos + i] || positions[pos - i],
        };
      }
    }

    return {
      isAbove: false,
      itemIndex: -1,
    };
  };

  const onMove = (e: any) => {
    e.preventDefault();
    const { isAbove, itemIndex } = isInRange(e.clientY);
    if (isAbove) {
      let items = newListItems.slice();
      let itemSwapIndex = itemIndex;
      let temp = items[currentItem];
      items[currentItem] = items[itemSwapIndex];
      items[itemSwapIndex] = temp;
      setNewListItems(items);
      setCurrentItem(itemSwapIndex);
    }

    setItemState({
      top: e.clientY - itemHeight / 2,
      left: e.clientX,
    });
  };

  const mouseUp = () => {
    setActive(false);
    setItemState({
      top: 0,
      left: 0,
    });
    setCurrentItem(-1);
  };

  const mouseDown = (e: any, index: number) => {
    setActive(true);
    setItemState({
      top: Math.round(initialPos + index * itemHeight),
      left: 0,
    });
    setCurrentItem(index);
  };

  return (
    <Container>
      <StyledUL>
        {newListItems.map((item, index) => {
          const { name } = item;
          return (
            <Fragment key={index}>
              <StyledBg
                style={{
                  display: index === currentItem ? "block" : "none",
                }}
              >
                {name}
              </StyledBg>
              <StyledItem
                ref={index === 0 ? itemRef : null}
                onMouseDown={(e) => mouseDown(e, index)}
                style={{
                  top: index === currentItem ? itemState.top + "px" : "0px",
                  position: index === currentItem ? "absolute" : "relative",
                  background:
                    index === currentItem && active ? "green" : "#000",
                  zIndex: index === currentItem ? 1 : 0,
                }}
              >
                {name}
              </StyledItem>
            </Fragment>
          );
        })}
      </StyledUL>
    </Container>
  );
};

export default DraggableList;
