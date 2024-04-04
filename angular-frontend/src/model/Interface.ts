export interface Contact {
    id: number
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
  createdAt: string
  updatedAt: string
  userId: string
  user: User
}
  export interface User {
    id?: number
    createdAt?: string
    updatedAt?: string
    name?: string
    email: string
    roleId?: string
  }
  
  
