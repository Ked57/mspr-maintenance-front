import * as React from "react";
import { useState } from "react";
import { AsyncUploadLauncher } from "../util/async-upload";

export const Idle = ({
  file,
  launcher
}: {
  file: any;
  launcher: AsyncUploadLauncher;
}) => {
  const [key, setKey] = useState("");
  return (
    <>
      <div className="mb-4">
        <h1 className="block text-grey-darker text-sm font-bold mb-2">
          Upload your file
        </h1>
        <div className="p-2 m-2">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            htmlFor="key"
          >
            Enter the authentication key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            type="key"
            name="key"
            onChange={e => setKey(e.target.value)}
          />
        </div>
        <div className="p-2 m-2">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            type="file"
            name="file"
            ref={file as any}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue hover:bg-blue-dark text-black shadow appearance-none border rounded font-bold py-2 px-4 rounded"
          id="submit-btn"
          type="button"
          onClick={() => launcher((file.current as any).files[0], key)}
        >
          Send
        </button>
      </div>
    </>
  );
};
