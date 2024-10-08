/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/slices/projectDetailSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define TypeScript interfaces
export interface RoadmapStep {
  icon: string;
  title: string;
  description: string;
}

export interface Member {
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Project {
  uuid: string;
  title: string;
  description: string;
  nextSteps: string;
  image: string; // Base64 string
  roadmapSteps: RoadmapStep[];
  members: Member[]; // Add this line
}

interface ProjectDetailState {
  project: Project | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProjectDetailState = {
  project: null,
  status: 'idle',
  error: null
};

// Async thunks
export const fetchProjectDetail = createAsyncThunk(
  'projectDetail/fetchProjectDetail',
  async (uuid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/projectDetail/${uuid}`, {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch project details');
      }
      const data: Project = await response.json();
      console.log(data);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch project details');
    }
  }
);

export const updateProjectDetailAsync = createAsyncThunk(
  'projectDetail/updateProjectDetail',
  async (
    { uuid, project }: { uuid: string; project: Project },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`/api/projectDetail/${uuid}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      });
      if (!response.ok) {
        throw new Error('Failed to update project details');
      }
      const data: Project = await response.json();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update project details');
    }
  }
);

export const uploadProjectImage = createAsyncThunk(
  'projectDetail/uploadProjectImage',
  async (
    { uuid, imageFile }: { uuid: string; imageFile: File },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`/api/projectDetail/${uuid}/uploadImage`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      const data = await response.json();
      return data; // "Image uploaded successfully"
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to upload image');
    }
  }
);

const projectDetailSlice = createSlice({
  name: 'projectDetail',
  initialState,
  reducers: {
    // You can add synchronous actions here if needed
  },
  extraReducers: builder => {
    builder
      // Fetch project
      .addCase(fetchProjectDetail.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProjectDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.project = action.payload;
      })
      .addCase(fetchProjectDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Failed to fetch project details';
      })
      // Update project
      .addCase(updateProjectDetailAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProjectDetailAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.project = action.payload;
      })
      .addCase(updateProjectDetailAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.payload as string) || 'Failed to update project details';
      })
      // Upload image
      .addCase(uploadProjectImage.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(uploadProjectImage.fulfilled, state => {
        state.status = 'succeeded';
        // Optionally, you could trigger a refetch of the project details to get updated image
      })
      .addCase(uploadProjectImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to upload image';
      });
  }
});

export default projectDetailSlice.reducer;
