import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => {
    setVisible(!visible);
  };

  // to expose the function toggle Visibility to the refs
  useImperativeHandle(ref, (() => {
    return {toggleVisiblity};
  }))

  return (
    <div>
      {!visible && <button onClick={toggleVisiblity}> {props.buttonText} </button>}
      {visible && (
        <div>
          {props.children}
          <button onClick={toggleVisiblity}>cancel</button>
        </div>
      )}
    </div>
  );
});

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Togglable;
