import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
}

interface UserDetailState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchData: string;
}

export const createUser = createAsyncThunk<
  User,
  any,
  { rejectValue: string }
>("createUser", async (data, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://641dd63d945125fff3d75742.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message || "An error occurred.");
    } else {
      return rejectWithValue("An error occurred.");
    }
  }
});

export const showUser = createAsyncThunk<User[]>(
  "showUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://641dd63d945125fff3d75742.mockapi.io/crud"
      );
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk<User, string>(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://641dd63d945125fff3d75742.mockapi.io/crud/${id}`,
        { method: "DELETE" }
      );

      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "An error occurred.");
      } else {
        if (error instanceof Error) {
          return rejectWithValue(error.message || "An error occurred.");
        } else {
          return rejectWithValue("An error occurred.");
        }
      }
    }
  }
);


export const updateUser = createAsyncThunk<User, User>(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://641dd63d945125fff3d75742.mockapi.io/crud/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "An error occurred.");
      } else {
        return rejectWithValue("An error occurred.");
      }
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData:"",
  } as UserDetailState,

  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;
