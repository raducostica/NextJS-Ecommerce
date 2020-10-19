import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 750px;
  margin: 0 auto;
`;

const GridItem = styled.div`
  background: red;
  height: 150px;
  border: 1px solid #000;
`;

const SelectedGridItem = styled.div`
  background: green;
  height: 150px;
  border: 1px solid #000;
`;

let items = new Array(25).fill("");
let attackBG = "X";
let heartsBG = "<3";
let guardsBG = "Guard";

const Game = () => {
  const [itemState, setItemState] = useState(() => {
    return items.map((item) => {
      return {
        bg: item,
        selected: false,
      };
    });
  });
  const [gameBG, setGameBG] = useState({
    heartsBG: 3,
    guardsBG: 5,
    attackBG: 3,
    portalBG: 1,
  });

  useEffect(() => {
    tester();
    // let attack = 0;
    // let hearts = 0;
    // let guards = 0;
    // while (guards < gameBG.guards) {
    //   const randomNum = generateRandomNum();
    //   console.log(randomNum);
    //   if (!affectedIndexes.includes(randomNum)) {
    //     items[randomNum].bg = guardsBG;
    //     guards++;
    //     affectedIndexes.push(randomNum);
    //   }
    // }
    // while (hearts < gameBG.hearts) {
    //   const randomNum = generateRandomNum();
    //   if (!affectedIndexes.includes(randomNum)) {
    //     items[randomNum].bg = heartBG;
    //     hearts++;
    //     affectedIndexes.push(randomNum);
    //   }
    // }
    // while (attack < gameBG.attack) {
    //   const randomNum = generateRandomNum();
    //   if (!affectedIndexes.includes(randomNum)) {
    //     items[randomNum].bg = attackBG;
    //     attack++;
    //     affectedIndexes.push(randomNum);
    //   }
    // }
    // setItemState(items);
  }, []);

  const tester = () => {
    let possibilities: { [key: number]: any } = {
      1: { count: 0, type: "attackBG" },
      2: { count: 0, type: "guardsBG" },
      3: { count: 0, type: "heartsBG" },
      4: { count: 0, type: "portalBG" },
    };
    let affectedIndexes: number[] = [];
    let items = itemState.slice();
    let flag = true;

    while (flag) {
      let randomNum = generateRandomNum(0, 25);
      if (!affectedIndexes.includes(randomNum)) {
        let randomPossiblity = generateRandomNum(1, 5);
        let current = possibilities[randomPossiblity];
        if (current.count === gameBG[current.type]) {
          continue;
        }
        items[randomNum].bg = current.type;
        current.count++;
        affectedIndexes.push(randomNum);
      }
      if (
        possibilities[1].count === gameBG[possibilities[1].type] &&
        possibilities[2].count === gameBG[possibilities[2].type] &&
        possibilities[3].count === gameBG[possibilities[3].type]
      ) {
        flag = false;
      }
    }

    setItemState(items);
  };

  const generateRandomNum = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const updateItemOnClick = (index: number) => {
    let items = itemState.slice();
    items[index].selected = true;
    setItemState(items);
  };

  console.log(itemState);
  return (
    <Grid>
      {itemState.map((item, index) => {
        return (
          <>
            {item.selected ? (
              <SelectedGridItem>{item.bg}</SelectedGridItem>
            ) : (
              <GridItem onClick={() => updateItemOnClick(index)} />
            )}
          </>
        );
      })}
    </Grid>
  );
};

export default Game;
