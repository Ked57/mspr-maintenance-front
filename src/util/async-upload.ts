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

export type AsyncUploadLauncher = (file: any, key: string) => void;

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

const authorizedTypes = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/xml",
  "text/xml"
];

export const useAsyncUpload = (
  fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  url: RequestInfo,
  options?: RequestInit
): [AsyncUploadStateMachine, AsyncUploadLauncher] => {
  const [state, setState] = useState<AsyncUploadStateMachine>({
    status: "idle"
  });
  return [
    state,
    async (file: any, key: string) => {
      console.log(
        "type",
        file.type,
        authorizedTypes.filter(type => type === file.type).length <= 0
      );
      if (!file) {
        setState({ status: "error", message: "No file provided" });
        return;
      } else if (
        authorizedTypes.filter(type => type === file.type).length <= 0
      ) {
        setState({ status: "error", message: "Wrong file extension provided" });
        return;
      }
      setState({
        status: "pending"
      });
      const formData = new FormData();
      formData.append("file", file);
      const [result, err] = await of(
        fetcher(url, {
          ...options,
          headers: { Authorization: `Bearer ${key}` },
          body: formData
        })
      );
      if (err) {
        setState({ status: "error", message: err.message });
        return;
      }
      if (result.status === 200 || result.status === 201) {
        setState({
          status: "success",
          message: result.statusText
        });
        return;
      }
      setState({ status: "error", message: result.statusText });
    }
  ];
};
