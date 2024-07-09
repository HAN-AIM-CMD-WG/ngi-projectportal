import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../types/company';
import { Project } from '../types/project';
import { User } from '../types/user';

interface CompanyState {
  company : Company | null;
  companies: Company[] | null;
  isLoading: boolean;
  projects: Project[] | null;
  members: User[];
  applicants: User[];
  applicantCount: number;
  error: string | null;
}

const initialState: CompanyState = {
  company: null,
  companies: [],
  isLoading: false,
  projects: [],
  members: [],
  applicants: [],
  applicantCount: 0,
  error: null,
};

export const fetchCompanyData = createAsyncThunk(
    'company/fetchCompanyData',
    async (uuid : string, {rejectWithValue }) => {
    try{
      const response = await fetch(`http://localhost:8080/api/company/${uuid}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
}catch(error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    } 
  }
  }
);

export const fetchCompanies = createAsyncThunk(
  'company/fetchCompanies',
  async(_, {rejectWithValue}) => {
    try {
      const response = await fetch('http://localhost:8080/api/company', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Failed to fetch companies');
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
)

export const fetchProjectByCompany = createAsyncThunk(
  'project/fetchProjectByCompany',
  async (uuid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/company/${uuid}/projects`,
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

export const fetchMembersByCompany = createAsyncThunk(
  'company/fetchMembersByCompany',
  async (uuid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/company/${uuid}/members`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch members');
      const members = await response.json();
      return members;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }
);

export const fetchApplicantsByCompany = createAsyncThunk(
  'company/fetchApplicantsByCompany',
  async (uuid: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/company/${uuid}/applicants`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch applicants');
      const applicants = await response.json();
      return applicants;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(error as string);
      }
    }
  }

);

export const updateApplicantStatus = createAsyncThunk(
  'company/updateApplicantStatus',
  async ({ uuid, userUuid, status }: { uuid: string; userUuid: string; status: string} , { rejectWithValue }) => {
    console.log(status);
    try {
      const response = await fetch(
        `http://localhost:8080/api/company/${uuid}/applicant/${userUuid}`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: status
        }
      );
      if (!response.ok) throw new Error('Failed to update applicant status');
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


const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
      addMember(state, action){
        state.members.push(action.payload);
      },
      removeApplicant(state, action){
        state.applicants = state.applicants.filter(applicant => applicant.uuid !== action.payload);
      }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCompanyData.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchCompanyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.company = action.payload;
                state.error = null;
            })
            .addCase(fetchCompanyData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchProjectByCompany.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchProjectByCompany.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload;
                state.error = null;
            })
            .addCase(fetchProjectByCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMembersByCompany.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchMembersByCompany.fulfilled, (state, action) => {
                state.isLoading = false;
                state.members = action.payload;
                state.error = null;
            })
            .addCase(fetchMembersByCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchApplicantsByCompany.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchApplicantsByCompany.fulfilled, (state, action) => {
                state.isLoading = false;
                state.applicants = action.payload;
                state.applicantCount = action.payload.length;
                state.error = null;
            })
            .addCase(fetchApplicantsByCompany.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateApplicantStatus.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateApplicantStatus.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateApplicantStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            ;
    }
});

export const { addMember, removeApplicant } = companySlice.actions;
export default companySlice.reducer;