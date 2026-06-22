import api from './axios';

export interface Avatar {
  url: string;
  public_id: string;
}

export interface Social {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface Profile {
  _id: string;
  clerkId: string;
  email: string;
  name?: string;
  role: 'tenant' | 'landlord';
  avatar?: Avatar;
  bio?: string;
  phone?: string;
  social?: Social;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileInput {
  name?: string;
  bio?: string;
  phone?: string;
  social?: Social;
}

export interface ProfileResponse {
  user: Profile;
  data: any[];
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const res = await api.get('/api/profile');
  return res.data;
};

export const updateProfile = async (data: UpdateProfileInput): Promise<Profile> => {
  const res = await api.patch('/api/profile', data);
  return res.data;
};

export const updateAvatar = async (avatar: Avatar): Promise<Profile> => {
  const res = await api.patch('/api/profile/avatar', { avatar });
  return res.data;
};