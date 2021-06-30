export interface ICategory {
  id: number
  name: string
}

export interface IBusiness {
  directoryIdx: number
  worldid: string
  library: string
  category: string
  title: string
  owner: string
  website: null | string
  city: string
  localowned: null | string
  status: string
  modified: string
}