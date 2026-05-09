export interface ListingImage{
  url: string
  public_id: string
}

export interface Listing{
  _id: string
  title: string
  description: string
  price: number
  location: string
  images: ListingImage[]
  landlord: string
  createdAt: string
  updatedAt: string
}

export interface ListingsResponse{
  rooms: Listing[]
  totalPages: number
  currentPage: number
  total: number
}

export interface ListingFilters{
  search?: string
  location?:string
  minPrice?: string | number
  maxPrice?: string | number
  page?: number
  limit?: number
}


export interface CreateListingInput{
  title:string
  description: string
  price: number
  location: string
  images: ListingImage[]
}


export interface UpdateListingInput extends Partial <CreateListingInput> {}