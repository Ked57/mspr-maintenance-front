import { useState } from "react";
import { of } from "await-of";

type IdleStatus = "idle";
type PendingStatus = "pending";
type SuccessStatus = "success";
type ErrorStatus = "error";

type AsyncUploadStatus =
  | IdleStatus
  | PendingStatus
  | SuccessStatus
  | ErrorStatus;

type AsyncUploadStateMachine = {
  status: AsyncUploadStatus;
  value?: any;
  message?: string;
};

export type AsyncUploadLauncher = (file: any) => void;

export const isIdle = (
  asyncUploadStatus: AsyncUploadStatus
): asyncUploadStatus is IdleStatus => asyncUploadStatus === "idle";
export const isPending = (
  asyncUploadStatus: AsyncUploadStatus
): asyncUploadStatus is PendingStatus => asyncUploadStatus === "pending";
export const isSuccess = (
  asyncUploadStatus: AsyncUploadStatus
): asyncUploadStatus is SuccessStatus => asyncUploadStatus === "success";
export const isError = (
  asyncUploadStatus: AsyncUploadStatus
): asyncUploadStatus is ErrorStatus => asyncUploadStatus === "error";

export const useAsyncUpload = (
  url: RequestInfo,
  options?: RequestInit
): [AsyncUploadStateMachine, AsyncUploadLauncher] => {
  const [state, setState] = useState<AsyncUploadStateMachine>({
    status: "idle"
  });
  return [
    state,
    async (file: any) => {
      if(!file) {
        setState({status: "error", message: "No file provided"})
        return;
      }else if(file.type !== "text/csv") {
        setState({status: "error", message: "Wrong file extension provided"})
        return;
      }
      setState({
        status: "pending"
      });
      const [result, err] = await of(fetch(url, { ...options, body: file }));
      if (err) {
        setState({ status: "error", message: err.message });
        return;
      }
      if (result.status !== 200) {
        setState({ status: "error", message: result.statusText });
      } else {
        setState({
          status: "success",
          message: result.statusText,
          value: await result.json()
        });
      }
    }
  ];
};
