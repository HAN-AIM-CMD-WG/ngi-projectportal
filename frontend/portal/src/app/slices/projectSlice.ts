import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Projects {
  uuid: string;
  title: string;
  description: string;
  created: string;
  tasks: Task[];
}

interface Task {
  title: string;
  skills: string[];
  isDone: boolean;
  uuid: string;
  projectUuid: string;
}

interface NewTask {
  title: string;
  skills: string[];
}

export interface ProjectState {
  projectName: string;
  description: string;
  email: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  projects: Projects[];
  currentProject: Projects | null;
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
  currentProject: null,
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

export const fetchTasks = createAsyncThunk(
  'project/fetchTasks',
  async (projectUuids: string[], { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:8080/api/task`, {
        method: 'POST', // Change to POST
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectUuids) // Send the body with POST
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const tasks = await response.json();
      console.log(tasks);
      return tasks;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const createTask = createAsyncThunk(
  'project/createTask',
  async (
    {
      creator,
      projectUuid,
      task
    }: { creator: string; projectUuid: string; task: NewTask },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/task/${creator}?projectUuid=${projectUuid}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(task)
        }
      );
      if (!response.ok) throw new Error('Failed to create task');
      const createdTask = await response.json();
      console.log(createdTask);
      return { projectUuid, task: createdTask };
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
        `http://localhost:8080/api/project/user/${email}`,
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

export const fetchProject = createAsyncThunk(
  'project/fetchProject',
  async (uuid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/project/${uuid}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch project');
      const project = await response.json();
      console.log(project);
      return project; // This will return a single project with tasks
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
      })
      .addCase(createTask.pending, state => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const { projectUuid, task } = action.payload;
        const project = state.projects.find(p => p.uuid === projectUuid);

        console.log('Project found:', project);
        console.log('Task being added:', task);

        if (!project) {
          console.error(`Project with uuid ${projectUuid} not found.`);
          return;
        }

        // Ensure tasks array is initialized
        if (!project.tasks) {
          project.tasks = [];
        }

        if (project) {
          project.tasks.push(task);
        }
        state.status = 'succeeded';
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchTasks.pending, state => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';

        const incomingTasks = action.payload;

        const tasksByProject = incomingTasks.reduce((acc, task) => {
          const { projectUuid } = task;
          if (!acc[projectUuid]) {
            acc[projectUuid] = [];
          }
          acc[projectUuid].push(task);
          return acc;
        }, {});

        state.projects.forEach(project => {
          if (tasksByProject[project.uuid]) {
            if (!project.tasks) {
              project.tasks = [];
            }
            const newTasks = tasksByProject[project.uuid].filter(
              incomingTask => {
                return !project.tasks.some(
                  existingTask => existingTask.uuid === incomingTask.uuid
                );
              }
            );

            project.tasks.push(...newTasks);
          }
        });
      })
      .addCase(fetchProject.pending, state => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.currentProject = action.payload; // Store the fetched project
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { setProjectName, setDescription } = projectSlice.actions;

export default projectSlice.reducer;
