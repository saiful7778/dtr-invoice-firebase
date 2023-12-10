import PropTypes from "prop-types";

const Input = ({
  className,
  placeholder,
  type,
  name,
  onChange,
  onBlur,
  value,
  error,
  touched,
}) => {
  return (
    <div>
      <input
        className={
          "input " +
          (error && touched ? "input-error " : "") +
          (className ? className : "")
        }
        placeholder={placeholder}
        type={type || "text"}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && touched && (
        <p className="mt-1 text-body-6 text-red-500">{error}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
export default Input;
