function OpenQuiz({setShowQuiz}) {
    return (
      <div className="open-screen-content">
        <h1 className="header">Quizzical</h1>
        <p className="description">Some description if needed</p>
       
        <button
          className="button"
          onClick={() => setShowQuiz(false)}
        >
          Start quiz
        </button>
      </div>
    );
  }
  
  export default OpenQuiz;