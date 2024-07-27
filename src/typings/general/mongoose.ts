export interface DeleteManyResponse {
  acknowledged: boolean,
  deletedCount: number,
  message: undefined, // not exist in mongoose
}