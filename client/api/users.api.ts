import api from './axios'

export const updateRole = async (role: 'landlord' | 'tenant'): Promise<void> => {
  await api.patch('/api/users/role', { role })
}