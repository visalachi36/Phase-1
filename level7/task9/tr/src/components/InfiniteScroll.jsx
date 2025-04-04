import React, { useState } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import "../styles.css";

const InfiniteScroll = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));

  const loadMoreItems = () => {
    setTimeout(() => {
      setItems((prev) => [...prev, ...Array.from({ length: 10 }, (_, i) => prev.length + i + 1)]);
    }, 1000);
  };

  const setObserverRef = useIntersectionObserver(loadMoreItems, {
    root: null,
    rootMargin: "100px",
    threshold: 1.0,
  });

  return (
    <div className="scroll-container">
      <h2>Infinite Scroll</h2>
      <ul>
        {items.map((item) => (
          <li key={item} className="scroll-item">
            Item {item}
          </li>
        ))}
      </ul>
      <div ref={setObserverRef} className="loading">
        Loading more...
      </div>
    </div>
  );
};

export default InfiniteScroll;
