function FileUpload() {
  return (
    <>
      <form encType="multipart/form-data" action="">
        <input type="file" />
        <input className={"button"} type="button" value="upload"></input>
      </form>
    </>
  );
}

export default FileUpload;
