import test from "ava";
import { File } from "file-api";
import { renderHook } from "@testing-library/react-hooks";
import { useAsyncUpload } from "../src/util/async-upload";

const mockFetcher = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> =>
  new Promise<Response>(resolve => resolve(new Response()));

const mockFile = new File({
  path: "example.csv",
  type: "text/csv"
});

test("The state machine is created with an idle status", async t => {
  const { result } = renderHook(() => useAsyncUpload(mockFetcher, "", {}));
  t.assert(
    result.current[0].status === "idle",
    `Expected state machine status: "idle", current state machine status: "${result.current[0].status}"`
  );
});

test("The state machine goes to anther status once the request is started", async t => {
  const { result } = renderHook(() => useAsyncUpload(mockFetcher, "", {}));
  const [state, launcher] = result.current;
  launcher(mockFile, "");
  t.assert(
    result.current[0].status !== "idle",
    `Expected state machine status: not "idle", current state machine status: "${result.current[0].status}", message: ${result.current[0].message}`
  );
});
