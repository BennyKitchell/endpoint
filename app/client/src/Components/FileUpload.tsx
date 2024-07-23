import React, { useState } from "react";

function FileUpload() {
  const [fileSelected, setFileSelected] = useState<File>();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files !== null) {
      setFileSelected(event.target.files[0]);
    }
  }
  return (
    <>
      <form encType="multipart/form-data" action="">
        <div>{JSON.stringify(fileSelected)}</div>
        <input type="file" onChange={handleChange} />
        <input className={"button"} type="button" value="upload"></input>
      </form>
    </>
  );
}

export default FileUpload;
