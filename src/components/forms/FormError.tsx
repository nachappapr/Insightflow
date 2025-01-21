import clsx from "clsx";

const FormError = ({
  errors,
  className,
  errorId,
}: {
  errors?: string[];
  className?: string;
  errorId?: string;
}) => {
  if (!errors) return null;
  return errors.map((error, index) => (
    <span
      key={index}
      className={clsx(`body3-semibold !font-normal text-error`, className)}
      id={errorId}
    >
      {error}
    </span>
  ));
};

export default FormError;
