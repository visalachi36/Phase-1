import React from "react";
import { FixedSizeList as List } from "react-window";

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const VirtualizedList = () => (
  <List height={500} width={400} itemCount={10000} itemSize={50}>
    {Row}
  </List>
);

export default React.memo(VirtualizedList);
