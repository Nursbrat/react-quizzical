import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchQuestions = createAsyncThunk(
  "api/fetchQuestions",
  async () => {
    const response = await axios.get(`https://opentdb.com/api.php?amount=10`);
    return response.data.results;
  }
);

export const QuizSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    status: "idle",
    score: 0,
  },
  reducers: {
 
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload.map((questionObject, index) => {
          const shuffledOptions = [
            questionObject.correct_answer,
            ...questionObject.incorrect_answers,
          ]
          .map((words) => words.replace(/&[^;];/g, ""))
            .sort(() => Math.random() - 0.5)
          const title = questionObject.question.replace(/&[^;]*;/g, "");
          return {
            ...questionObject,
            index:index,
            selectedAnswer:'',
            correctAnswer:questionObject.correct_answer,
            shuffledOptions:shuffledOptions,
            question: title,
          };
        });
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.status = "failed";
        console.log(state);
      });
  },
});

export default QuizSlice.reducer;

export const { setScore } = QuizSlice.actions;
