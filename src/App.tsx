import * as React from "react";

export default () => {
  const file = React.createRef();
  const uploadFile = async file => {
    const result = await fetch("http://localhost/anything", {
      method: "POST",
      body: file
    });
    console.log("result", result);
  };
  return (
    <>
      <h1>File upload</h1>
      <input
        type="file"
        name="file"
        label="upload csv file"
        ref={file}
        onChange={() => uploadFile(file.current.files[0])}
      />
    </>
  );
};
