export interface Contact {
  id?: number
  firstName: string
  lastName: string
  title: string
  phoneNumber: string
  email: string
  department: string
  company: string
  location: string
  isExternal: boolean
  notes: string
  createdAt?: string
  updatedAt?: string
  userId?: string
  user?: User
}
export interface User {
  id?: number
  createdAt?: string
  updatedAt?: string
  name?: string
  email: string
  roleId?: string
}
export interface Role {
  id: number
  name: string
  roleManagement: boolean
  userManagement: boolean
  contactManagement: boolean
  deleting: boolean
  writing: boolean
  editing: boolean
  reading: boolean
}

export interface SessionUser {
  id: number
  name: string
  email: string
  roleId: string
  roleManagement: boolean
  userManagement: boolean
  contactManagement: boolean
  deleting: boolean
  writing: boolean
  editing: boolean
  reading: boolean
}



