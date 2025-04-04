import React, { lazy, Suspense } from "react";
import "../styles/LargeComponent.css";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

const LargeComponent = () => {
  return (
    <div className="large-container">
      <h2>Large Component</h2>
      <Suspense fallback={<p>Loading Heavy Component...</p>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
};

export default LargeComponent;
