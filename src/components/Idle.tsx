import * as React from "react";
import { AsyncUploadLauncher } from "../util/async-upload";

export const Idle = ({
  file,
  launcher
}: {
  file: any;
  launcher: AsyncUploadLauncher;
}) => {
    console.log("file", file);
  return (
    <>
      <div className="mb-4">
        <label
          className="block text-grey-darker text-sm font-bold mb-2"
          htmlFor="username"
        >
          Upload your file
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          type="file"
          name="file"
          ref={file as any}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue hover:bg-blue-dark text-black shadow appearance-none border rounded font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => launcher((file.current as any).files[0])}
        >
          Send
        </button>
      </div>
    </>
  );
};
