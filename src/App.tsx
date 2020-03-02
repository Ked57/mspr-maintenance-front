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
  return (
    <>
      <h1>File upload</h1>
      <input
        type="file"
        name="file"
        ref={file as any}
        onChange={() => launcher((file.current as any).files[0])}
      />
    </>
  );
};
