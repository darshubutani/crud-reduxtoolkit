import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createGroup, updateGroup, deleteGroup } from "./groupDetailSlice";
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: "Male" | "Female";
  group?: any;
}

export interface UserDetailState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchData: string;
}

export const createUser = createAsyncThunk<User, any, { rejectValue: string }>(
  "createUser",
  async (data, { rejectWithValue }) => {
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
  }
);

export const showUser = createAsyncThunk<User[]>(
  "showUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://641dd63d945125fff3d75742.mockapi.io/crud"
      );
      const result = await response.json();
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
    searchData: "",
    group: "general",
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
      })
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        const updatedUsers = state.users.map((user) => {
          const updatedUser = action.payload.users.find(
            (updated: { id: string }) => Number(updated.id) === Number(user.id)
          );
          if (updatedUser) {
            const mergedGroup = Array.isArray(user.group)
              ? [
                  ...user.group,
                  { [action.payload.id]: action.payload.group },
                ]
              : [{ [action.payload.id]: action.payload.group }];
            return {
              ...user,
              group: mergedGroup,
            };
          }
          return user;
        });
        console.log("updated users after Adding", updatedUsers);
        return {
          ...state,
          users: updatedUsers,
          loading: false,
        };
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        console.log("action.payload...", action.payload.users);
        const deletedGroupName = action.payload.group;
        const updatedUsers = state.users.map((user) => {
          // if (user.group && user.group.includes(deletedGroupName)) {
          //   const updatedGroup = user.group.filter(
          //     (groupName: any) => groupName !== deletedGroupName
          //   );
          //   return {
          //     ...user,
          //     group: updatedGroup,
          //   };
          // }
          if (user.group && user.group.some((groupObj: { [key: string]: string }) => groupObj[action.payload.id])) {
            const updatedGroup = user.group.filter((groupObj: { [key: string]: string }) => !groupObj[action.payload.id]);
            return {
              ...user,
              group: updatedGroup,
            };
          }
          return user;
        });
        console.log("updated users after delete", updatedUsers);
        return {
          ...state,
          users: updatedUsers,
          loading: false,
        };
      })

      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        console.log("updateGroup.....action", action.payload)
        const updatedUsers = state.users.map((user) => {
          const updatedUser = action.payload.users.find(
            (updated: { id: string }) => Number(updated.id) === Number(user.id)
          );
          if (updatedUser) {
            const updatedGroup = Array.isArray(user.group)
              ? [
                  ...user.group.filter((groupObj) => !groupObj[action.payload.id]),
                  { [action.payload.id]: action.payload.group },
                ]
              : [{ [action.payload.id]: action.payload.group }];
              return {
                ...user,
                group: updatedGroup,
              };
          }
          return user;
        });
      
        console.log("updatedUser........", updatedUsers);
        return {
          ...state,
          loading: false,
          users: updatedUsers,
        };
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;
