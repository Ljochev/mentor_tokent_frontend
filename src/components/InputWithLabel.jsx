import './InputWithLabel.css'; 

const InputWithLabel = ({ label="", ...props }) => {
  return (
    <div className="input-container">
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
    </div>
  );
};

export default InputWithLabel;