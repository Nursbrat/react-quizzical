import React, { useState } from "react";
import OpenQuiz from "./components/OpenQuiz";
import Quiz from "./features/questions/QuestionsList";

import yellow from "./assets/blobs-yellow.png";
import blue from "./assets/blobs-blue.png";

function App() {
  const [showQuiz, setShowQuiz] = useState(true);
  return (
    <div className="app">
      <img className="img-yellow" src={yellow} alt="" />

      {showQuiz ? <OpenQuiz setShowQuiz={setShowQuiz} /> : <Quiz />}
      <img className="img-blue" src={blue} alt="" />
    </div>
  );
}

export default App;
