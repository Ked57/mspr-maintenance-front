import * as React from "react";
import {
  useAsyncUpload,
  isPending,
  isError,
  isSuccess
} from "./util/async-upload";
import "./App.css";

export default () => {
  const file = React.createRef();
  const [state, launcher] = useAsyncUpload("http://localhost/anything", {
    method: "POST"
  });
  console.log("value", state.value);

  const showIdle = () => (
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

  return (
    <div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      {(() => {
        if (isPending(state.status)) {
          return <p>Request is pending</p>;
        }
        if (isError(state.status)) {
          return (
            <>
              <h1>Error</h1>
              <p>{state.message}</p>
            </>
          );
        }
        if (isSuccess(state.status)) {
          return (
            <>
              <h1>Success !</h1>
            </>
          );
        }
        return showIdle();
      })()}
      </div>
    </div>
  );
};
