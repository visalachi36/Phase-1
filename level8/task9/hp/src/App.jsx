import React, { useState } from "react";
import CancellableRequest from "./components/CancellableRequest";

const App = () => {
    const [showComponent, setShowComponent] = useState(true);

    return (
        <div>
            <button onClick={() => setShowComponent(!showComponent)}>
                {showComponent ? "Unmount Component" : "Mount Component"}
            </button>

            {showComponent && <CancellableRequest />}
        </div>
    );
};

export default App;
