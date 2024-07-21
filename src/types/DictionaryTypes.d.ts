export interface HomePageDictionaryData {
  homePage: HomePage
}

export interface HomePage {
  title: string
  description: string
  searchRadio: SearchRadio
  favoriteRadios: FavoriteRadios
  pagination: Pagination
}

export interface SearchRadio {
  description: string
  filter: Filter
  searchTerm: SearchTerm
  search: string
  radiosFound: string
  noRadiosFound: string
}

export interface Filter {
  title: string
  label: string
  placeholder: string
  options: Option[]
}

export interface Option {
  label: string
  value: string
}

export interface SearchTerm {
  title: string
  label: string
  placeholder: string
}

export interface FavoriteRadios {
  description: string
  noFavoriteRadios: string
  radioPlayer: RadioPlayer
  editModal: EditModal
  deleteModal: DeleteModal
}

export interface RadioPlayer {
  description: string
  play: string
  pause: string
  time: string
  volume: string
  mute: string
  unmute: string
  refresh: string
  edit: string
  delete: string
}

export interface EditModal {
  title: string
  description: string
  editName: string
  userNotes: string
  save: string
  cancel: string
  close: string
}

export interface DeleteModal {
  title: string
  description: string
  delete: string
  cancel: string
  close: string
}

export interface Pagination {
  previous: string
  next: string
  currentPage: string
}
