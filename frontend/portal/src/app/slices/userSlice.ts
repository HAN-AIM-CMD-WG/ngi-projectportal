import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Status } from '../types/status';
import { User } from '../types/user';

interface UserState {
  users: User[];
  availableStatus: Status[];
  isLoading: boolean;
  error: string | null;
  verificationStatus:
    | 'PENDING'
    | 'SUCCESS'
    | 'ALREADY_VERIFIED'
    | 'ERROR'
    | null;
  participants: User[];
}

const initialState: UserState = {
  users: [],
  availableStatus: [],
  isLoading: false,
  error: null,
  verificationStatus: null,
  participants: []
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/person', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error: unknown) {
      console.log('error', error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const verifyUser = createAsyncThunk(
  'users/verifyUser',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/person/verify/${email}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to verify user');
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (
    { name, email }: { name: string; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/person/createGuest',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            status: []
          })
        }
      );
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const fetchStatuses = createAsyncThunk(
  'users/fetchStatuses',
  async (_, { rejectWithValue }) => {
    try {
      console.log('fetching statuses');
      const response = await fetch('http://localhost:8080/api/status', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch statuses');
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async (
    { email, name, status }: { email: string; name: string; status: string[] },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/person/${email}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            status: status
          })
        }
      );
      if (!response.ok) {
        throw new Error('Failed to edit user');
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const getParticipiants = createAsyncThunk(
  'users/getDeelnemers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/person/deelnemers',
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch deelnemers');
      }
      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchStatuses.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.availableStatus = action.payload;
        state.error = null;
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(editUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(
          user => user.email === action.payload.email
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(verifyUser.pending, state => {
        state.verificationStatus = 'PENDING';
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.verificationStatus = action.payload.status;
      })
      .addCase(verifyUser.rejected, state => {
        state.verificationStatus = 'ERROR';
      })
      .addCase(getParticipiants.pending, state => {
        state.isLoading = true;
      })
      .addCase(getParticipiants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.participants = action.payload;
        state.error = null;
      })
      .addCase(getParticipiants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default userSlice.reducer;
