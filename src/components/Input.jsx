import React, { useEffect, useState } from "react";
import styles from "../styles/input.module.scss";

const Input = ({
  id = null,
  label = "",
  labelClassName = "",
  inputWrap = "",
  inputClass = "",
  errorClass = "",
  parentClass = "",
  prefixIcon = null,
  suffixIcon = null,
  iconContainerClass = "",
  errors = [],
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
    </div>
  );
};

export default Input;
