export class DataResponseDTO<T = unknown> {
  message: string;
  data: T;
}
export const dataResponse = <T>(
  data: T,
  message = 'Request Processed successfully',
) => ({
  message,
  data,
});
