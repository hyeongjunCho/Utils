import React, { useState } from 'react';
import { useEffect } from 'react';

const FillUpResponsiveCell = (props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    console.log(props)
    setIndex(props.index % (props.numCol ? props.numCol : 1));
  });

  return (
    <div
      className="fill-up-responsive-cell"
      style={{ width: `${100 / (props.numCol ? props.numCol : 1)}%` }}
      {...Object.keys(props.callback ?? {})?.reduce((acc, cur) => {
        acc[cur] = (e) => props.callback[cur](e, props.data);
        return acc;
      }, {})}
    >
      <div
        className="fill-up-responsive-cell-before-margin"
        style={{ flex: index }}
      />
      {props.children}
      <div
        className="fill-up-responsive-cell-after-margin"
        style={{ flex: props.numCol - 1 - index }}
      />
    </div>
  );
}

export default FillUpResponsiveCell;