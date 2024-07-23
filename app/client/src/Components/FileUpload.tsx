import React, { useState } from "react";
import FileDisplay from "./FileDisplay";

function FileUpload() {
  const [fileSelected, setFileSelected] = useState<File>();
  const [commands, setCommands] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setFileSelected(event.target.files[0]);
    }
  };

  const fetchData = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    if (fileSelected) {
      const data = new FormData();
      data.append("", fileSelected, fileSelected.name);

      fetch("http://localhost:3000/upload/file", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          return response.json();
        })

        .then((data) => {
          setCommands(data);
        });
    }
  };

  return (
    <>
      <form encType="multipart/form-data" action="">
        <FileDisplay commands={commands} />
        <input type="file" onChange={handleChange} />
        <input
          className={"button"}
          type="button"
          value="upload"
          onClick={fetchData}
        ></input>
      </form>
    </>
  );
}

export default FileUpload;
