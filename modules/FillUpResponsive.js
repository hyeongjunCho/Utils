import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import FillUpResponsiveCell from "./FillUpResponsiveCell";
import "./FillUpResponsive.scss";

const FillUpResponsive = (props) => {
  const [numCol, setNumCol] = useState(0);
  const [count, setCount] = useState(0);
  const container = useRef();

  const [childrenWithProps, setChildrenWithProps] = useState([]);

  const calculateNumCol = (e) => {
    if (props.numCol) setNumCol(props.numCol);
    else setNumCol(Math.floor(container.current?.offsetWidth / props.cellWidth));
  };

  useEffect(() => {
    setCount(props.children.length);
  }, [props.children]);

  useEffect(() => {
    if (!container.current) return;
    window.addEventListener("resize", calculateNumCol);
  }, [container.current]);

  useEffect(() => {
    if (numCol) return;
    calculateNumCol();
  }, [container.current?.offsetWidth]);
  
  useEffect(() => {
    setChildrenWithProps(
      props.children.map((child, index) => {
        return (
          <FillUpResponsiveCell key={index} numCol={isNaN(numCol) ? 0 : numCol} index={index} data={child.props.data} callback={child.props.callback}>
            {child}
          </FillUpResponsiveCell>
        )
      })
    );
  }, [numCol, props.children]);

  return (
    <div ref={container} className="fill-up-responsive-table">
      <div className="fill-up-responsive-row">
        {childrenWithProps}
        {count % numCol ? (
          <div
            style={{
              flex: 1,
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FillUpResponsive;
