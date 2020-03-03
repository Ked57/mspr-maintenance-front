import * as React from "react";
import {
  useAsyncUpload,
  isPending,
  isError,
  isSuccess
} from "./util/async-upload";
import "./App.css";
import { Idle } from "./components/Idle";

export default () => {
  const file = React.createRef();
  const [state, launcher] = useAsyncUpload(
    fetch,
    "https://mspr-maintenance.cluster.maelchauvet.fr/upload",
    {
      method: "POST"
    }
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
          return <Idle file={file} launcher={launcher} />;
        })()}
      </div>
    </div>
  );
};
