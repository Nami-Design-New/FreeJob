import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";

export default function InputField({ label, toolTipContent, span, ...props }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {props.content}
    </Tooltip>
  );

  return (
    <div className="input-field w-100">
      <label>
        <div className="d-flex justify-content-between align-items-center">
          <span>{label}</span>
          {toolTipContent && (
            <OverlayTrigger
              placement="bottom"
              overlay={renderTooltip({
                content: toolTipContent,
              })}
            >
              <IoCloseOutline />
            </OverlayTrigger>
          )}
        </div>
      </label>
      <Form.Control className="form-control" {...props} />
      {span && <span className="input-span">{span}</span>}
    </div>
  );
}
