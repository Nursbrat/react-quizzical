import { configureStore } from "@reduxjs/toolkit";
import Quizreducer from '../features/questions/QuizSlice';

export const store = configureStore({
  reducer: {
    questions: Quizreducer,
  },
});
