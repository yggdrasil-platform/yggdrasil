// Interfaces
import ITcpResponseErrorBody from './ITcpResponseErrorBody';

type ITcpResponse<TData> = [ITcpResponseErrorBody | null, TData];

export default ITcpResponse;
