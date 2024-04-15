import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Projects {
  title: string;
  description: string;
  created: string;
}

interface ProjectState {
  projectName: string;
  description: string;
  email: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  projects: Projects[];
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
  titleExists: boolean;
}

const initialState: ProjectState = {
  projectName: '',
  description: '',
  email: '',
  status: 'idle',
  projects: [],
  fetchStatus: 'idle',
  error: undefined,
  titleExists: false
};

export const createProject = createAsyncThunk(
  'project/createProject',
  async (
    {
      email,
      projectName,
      description
    }: { email: string; projectName: string; description: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/create/${email}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: projectName,
            description: description
          })
        }
      );
      if (!response.ok) throw new Error('Network response was not ok');
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

export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/${email}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch projects');
      const projects = await response.json();
      return projects;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const fetchIfTitleExists = createAsyncThunk(
  'project/fetchIfTitleExists',
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/exists/${title}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch projects');
      const exists = await response.json();
      return exists;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectName: (state, action) => {
      state.projectName = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createProject.pending, state => {
        state.status = 'loading';
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
        state.status = 'succeeded';
        state.projectName = '';
        state.description = '';
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchProjects.pending, state => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchIfTitleExists.pending, state => {
        state.titleExists = false;
      })
      .addCase(fetchIfTitleExists.fulfilled, (state, action) => {
        state.titleExists = action.payload;
      })
      .addCase(fetchIfTitleExists.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { setProjectName, setDescription } = projectSlice.actions;

export default projectSlice.reducer;
