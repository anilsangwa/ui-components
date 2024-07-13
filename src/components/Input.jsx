import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/input.module.scss";
import ErrorMessage from "./ErrorMessage";

const Input = ({
  id,
  label,
  parentClass,
  labelClassName,
  inputWrap,
  inputClass,
  prefixIcon,
  suffixIcon,
  iconContainerClass,
  errors,
  errorClass,
  ...props
}) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (errors?.length || isValid !== null) {
      setIsValid(errors.length ? false : true);
    }
  }, [errors, isValid]);

  return (
    <div className={`${styles.container} ${parentClass}`}>
      {label && (
        <label
          className={`${styles.label} ${labelClassName}`}
          htmlFor={id ?? props?.name}
        >
          {label}
        </label>
      )}
      <div
        className={`${styles.inputWrapper} ${inputWrap} ${
          isValid === true
            ? styles.valid
            : isValid === false
            ? styles.invalid
            : ""
        }`}
      >
        {prefixIcon && (
          <div className={`${styles.prefixIcon} ${iconContainerClass}`}>
            {prefixIcon}
          </div>
        )}
        <input id={id ?? props.name} className={`${inputClass}`} {...props} />
        {suffixIcon && (
          <div className={`${styles.suffixIcon} ${iconContainerClass}`}>
            {suffixIcon}
          </div>
        )}
      </div>

      <ErrorMessage errors={errors} errorClass={errorClass} />
    </div>
  );
};

Input.defaultProps = {
  id: null,
  label: "",
  labelClassName: "",
  inputWrap: "",
  inputClass: "",
  errorClass: "",
  parentClass: "",
  prefixIcon: null,
  suffixIcon: null,
  iconContainerClass: "",
  errors: [],
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  inputWrap: PropTypes.string,
  inputClass: PropTypes.string,
  errorClass: PropTypes.string,
  parentClass: PropTypes.string,
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
  iconContainerClass: PropTypes.string,
  errors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  // Spread props are expected to be standard HTML input attributes
  // and do not need to be explicitly declared in propTypes.
};

export default Input;
