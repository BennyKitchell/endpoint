interface DisplayProps {
  commands: String[];
}
function FileDisplay(props: DisplayProps) {
  return (
    <>
      <div>{props.commands}</div>
    </>
  );
}

export default FileDisplay;
