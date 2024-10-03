import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BoardState {
  data: any[];
  parameters: {
    skip: number;
    limit: number;
    type: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: BoardState = {
  data: [],
  parameters: {
    skip: 1,
    limit: 100,
    type: 'news',
  },
  loading: false,
  error: null,
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoardData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
    setParameters: (state, action: PayloadAction<Partial<BoardState['parameters']>>) => {
      state.parameters = { ...state.parameters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // 데이터를 추가하는 경우의 예시
    addBoardData: (state, action: PayloadAction<any[]>) => {
      state.data = [...state.data, ...action.payload];
    },
    // 기타 리듀서 정의
  },
});

export const { setBoardData, setParameters, setLoading, setError, addBoardData } = boardSlice.actions;

export default boardSlice.reducer;
