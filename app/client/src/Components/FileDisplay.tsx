import parse from "html-react-parser";

interface DisplayProps {
  commands: string[];
}

function FileDisplay(props: DisplayProps) {
  const commands = props.commands;
  return (
    <>
      {
        <div>
          {commands.length > 0 ? (
            commands.map((notification: string, key: number) => (
              <div key={key} className="outer-command-container">
                <div
                  className={
                    notification.includes("Invalid")
                      ? "command error"
                      : "command"
                  }
                >
                  {parse(notification)}
                </div>
              </div>
            ))
          ) : (
            <h2>Please upload a file below</h2>
          )}
        </div>
      }
    </>
  );
}

export default FileDisplay;
