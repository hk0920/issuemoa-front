// src/dataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../types/board';

interface DataState {
  board: Board[];
}

const initialState: DataState = {
  board: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setBoard(state, action: PayloadAction<Board[]>) {
      state.board = action.payload;
    },
    clearBoard(state) {
      state.board = [];
    },
    appendBoard(state, action: PayloadAction<Board[]>) {
      // 기존의 상태에 새로운 데이터를 추가합니다.
      state.board = [...state.board, ...action.payload];
    },
  },
});

export const { setBoard, clearBoard, appendBoard } = dataSlice.actions;

export default dataSlice.reducer;
