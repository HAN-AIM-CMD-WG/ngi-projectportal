import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface TaskType {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: 'to-do' | 'in-progress' | 'completed';
}

interface TaskState {
  tasks: TaskType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: undefined
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/tasks/${projectId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return await response.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(error as string);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (
    { projectId, title, description, status }: TaskType,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/tasks/${projectId}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, description, status })
        }
      );
      if (!response.ok) throw new Error('Failed to add task');
      return response.json();
    } catch (error) {
      console.log(error);
      return rejectWithValue(error instanceof Error ? error.message : error);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default tasksSlice.reducer;
