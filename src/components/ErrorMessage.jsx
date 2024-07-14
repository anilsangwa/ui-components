import React from "react";
import PropTypes from "prop-types";
import style from "../styles/error-message.module.scss";

const ErrorMessage = ({ errors, showList, errorClass }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className={`${style.errorMessage} ${errorClass}`}>
      {typeof errors === "string" ? (
        errors
      ) : showList ? (
        <ul>
          {errors.map((err, ind) => (
            <li key={ind}>{err}</li>
          ))}
        </ul>
      ) : (
        errors[0]
      )}
    </div>
  );
};

ErrorMessage.defaultProps = {
  errors: [],
  showList: false,
  errorClass: "",
};

ErrorMessage.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  showList: PropTypes.bool,
  errorClass: PropTypes.string,
};

export default React.memo(ErrorMessage);
