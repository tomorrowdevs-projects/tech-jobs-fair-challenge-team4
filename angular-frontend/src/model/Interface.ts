export interface Contact {
    id: number
    firstName: string
    lastName: string
    title: Title
    phoneNumber: string
    email: string
    telegram: Telegram
    linkedin: Linkedin
    department: Department
    company: string
    vatNumber: VatNumber
    location: Location
    isExternal: boolean
    notes: Notes
    createdAt: string
    updatedAt: string
  }
  
  export interface Title {}
  
  export interface Telegram {}
  
  export interface Linkedin {}
  
  export interface Department {}
  
  export interface VatNumber {}
  
  export interface Location {}
  
  export interface Notes {}

  export interface User {
    id?: number
    createdAt?: string
    updatedAt?: string
    name?: string
    email: string
    roleId?: RoleId
  }
  
  export interface RoleId {}
  
