import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Company } from '../types/company';
import { Project } from '../types/project';
import { User } from '../types/user';
import { Applicant } from '../types/applicant';

interface CompanyState {
  company : Company | null;
  companies: Company[] | null;
  isLoading: boolean;
  projects: Project[] | null;
  members: User[];
  applicants: Applicant[];
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

export const procesAcceptApplicant = createAsyncThunk(
  'company/acceptApplicant',
  async ({ uuid, userUuid, role }: { uuid: string; userUuid: string; role: string} , { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/company/${uuid}/applicant/${userUuid}/accept`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: role
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

export const procesDenyingApplicant = createAsyncThunk(
  'company/denyApplicant',
  async ({ uuid, userUuid }: { uuid: string; userUuid: string} , { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/company/${uuid}/applicant/${userUuid}/deny`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
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
      },
      rejectApplicant(state, action){
        state.applicants = state.applicants.map(applicant => {
          if(applicant.uuid === action.payload){
            applicant.status = 'DENIED';
          } else {
            applicant.status = 'PENDING';
          }
          return applicant;
        });
      },
      acceptApplicant(state, action){
        state.applicants = state.applicants.map(applicant => {
          if(applicant.uuid === action.payload){
            applicant.status = 'ACCEPTED';
          } else {
            applicant.status = 'PENDING';
          }
          return applicant;
        });
      },
      resetApplicantStatusToPending(state){
        state.applicants = state.applicants.map(applicant => {
          applicant.status = 'PENDING';
          return applicant;
        });
      },
      updateApplicantCount(state){
        state.applicantCount = state.applicants.length;
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
            .addCase(procesAcceptApplicant.pending, state => {
                state.isLoading = true;
            })
            .addCase(procesAcceptApplicant.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(procesAcceptApplicant.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(procesDenyingApplicant.pending, state => {
                state.isLoading = true;
            })
            .addCase(procesDenyingApplicant.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(procesDenyingApplicant.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { addMember, removeApplicant, rejectApplicant, acceptApplicant, resetApplicantStatusToPending,updateApplicantCount } = companySlice.actions;
export default companySlice.reducer;