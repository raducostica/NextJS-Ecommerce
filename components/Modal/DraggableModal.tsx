import styled from "styled-components";
import { useState, useEffect } from "react";
import ModalPortal from "./ModalPortal";
import Icon from "../../toolkit/Icon/Icon";

const ModalContainer = styled.div`
  background: #fff;
  padding: 8px;
  z-index: 1;
  position: absolute;
  right: 0;
  top: 0;
  height: auto;
  width: 560px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.5); */
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
`;

const StyledLogo = styled.div`
  font-size: 18px;
`;

const ModalContent = styled.div`
  padding-top: 16px;
`;

const DraggableModal = (props: any) => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.addEventListener("mousemove", onMove);

      return () => document.body.removeEventListener("mousemove", onMove);
    }
  }, [modal]);

  const onMove = (e: any) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };
  // const [currentlyDragged, setCurrentlyDragged] = useState(false);

  // const onDrag = (event: any) => {
  //   if (!event.target.id) return;
  //   let elStyle = window.getComputedStyle(event.target, null);
  //   let data =
  //     parseInt(elStyle.getPropertyValue("left")) -
  //     event.clientX +
  //     "," +
  //     (parseInt(elStyle.getPropertyValue("top")) - event.clientY) +
  //     "," +
  //     event.target.id;
  //   event.dataTransfer.setData("dragged-item", data);
  // };

  // const onDrop = (event: any) => {
  //   event.preventDefault();
  //   setCurrentlyDragged(false);
  //   let data = event.dataTransfer.getData("dragged-item");
  //   const [left, top, id] = data.split(",");
  //   let el = document.getElementById(id);
  //   el!.style.left = event.clientX + parseInt(left, 10) + "px";
  //   el!.style.top = event.clientY + parseInt(top, 10) + "px";
  // };
  return (
    <>
      {props.modalState && (
        <ModalPortal selector={props.selector}>
          <ModalOverlay
          // onDrop={(e) => onDrop(e)}
          // onDragOver={(e) => e.preventDefault()}
          >
            <div
              style={{ position: "relative", height: "100%", width: "100%" }}
            >
              <ModalContainer
                id="draggableModal"
                onMouseDown={() => setModal(true)}
                onMouseUp={() => setModal(false)}
                style={{
                  left: position.x,
                  top: position.y,
                  cursor: modal ? "none" : "initial",
                }}
                // draggable={props.draggable ? true : false}
                // onDragStart={(e) => onDrag(e)}
                // onDrag={() => setCurrentlyDragged(true)}
                // style={{ display: currentlyDragged ? "none" : "block" }}
              >
                <StyledLogo>Logo</StyledLogo>
                <IconContainer onClick={props.handleOnCloseModal}>
                  <Icon iconName="CLOSE" />
                </IconContainer>
                <ModalContent>{props.children}</ModalContent>
              </ModalContainer>
            </div>
          </ModalOverlay>
        </ModalPortal>
      )}
    </>
  );
};

export default DraggableModal;
