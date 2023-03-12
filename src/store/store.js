import { configureStore } from '@reduxjs/toolkit';
import periodReducer from '../reducers/periodReducer';

export default configureStore({
  reducer: {
    period: periodReducer,
  },
});
