import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  roles: string[];
  isLoading: boolean;
  authChecking: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  email: null,
  roles: [],
  isLoading: false,
  authChecking: true,
  error: null,
  isLoggedIn: false
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { email, password } = credentials;

      const params = new URLSearchParams();
      params.append('username', email);
      params.append('password', password);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      if (!response.ok) {
        throw new Error('Login failed');
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

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (googleToken: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: googleToken })
      });

      if (!response.ok) {
        throw new Error('Google login failed');
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

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        return true;
      } else {
        console.error('Logout failed:', response.statusText);
        return rejectWithValue('Logout failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const checkAuthentication = createAsyncThunk(
  'auth/checkAuthentication',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/authentication', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return rejectWithValue('Authentication check failed');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSessionActive: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.email = action.payload;
      state.authChecking = false;
    },
    setSessionInactive: state => {
      state.isLoggedIn = false;
      state.email = null;
      state.authChecking = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.roles = action.payload.roles;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.authChecking = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.authChecking = false;
      })
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.email = null;
        state.isLoading = false;
        state.authChecking = false;
        state.error = null;
        state.roles = [];
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.authChecking = false;
      })
      .addCase(checkAuthentication.pending, state => {
        state.isLoading = true;
        state.authChecking = true;
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authChecking = false;
        state.isLoggedIn = true;
        state.email = action.payload.email;
        state.roles = action.payload.roles;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.authChecking = false;
        state.isLoggedIn = false;
        state.email = null;
        state.roles = [];
      })
      .addCase(loginWithGoogle.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.roles = action.payload.roles;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.authChecking = false;
        state.error = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.authChecking = false;
      });
  }
});

export const { setSessionActive, setSessionInactive } = authSlice.actions;
export default authSlice.reducer;
