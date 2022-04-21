const Button = ({ target, title }) => {
  return (
    <div>
      <h1 className={`${target} === 'primary' ? 'primary' : 'secondary'`}>
        {title}
      </h1>
    </div>
  );
};

export default Button;
