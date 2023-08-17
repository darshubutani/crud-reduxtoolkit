import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
  group?: string | string[];
}

export interface UserDetailState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchData: string;
}

interface Group {
  id: string;
  name: string;
  users: User[];
}

export interface GroupDetailState {
  users: User[];
  groups: Group[];
  loading: boolean;
}

export const createGroup = createAsyncThunk<any, any>(
  "createGroup",
  async (data: any) => {
    try {
      console.log("data is.... ", data);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const updateGroup = createAsyncThunk<any, any>(
    "updateGroup",
    async (data: any) => {
      try {
        console.log("data is.... ", data);
        return data;
      } catch (error) {
        console.log("error", error);
      }
    }
  );

export const deleteGroup = createAsyncThunk<any, any>(
  "deleteGroup",
  async (data: any) => {
    try {
      console.log("data is.... ", data);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const groupDetail = createSlice({
  name: "groupDetail",
  initialState: {
    users: [],
    groups: [],
    loading: false,
  } as GroupDetailState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
        //console.log(JSON.parse(JSON.stringify(state.groups)));
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter((ele) => ele.id !== action.payload.id);
        //console.log(JSON.parse(JSON.stringify(state.groups)));
        state.loading = false;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = state.groups.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default groupDetail.reducer;
