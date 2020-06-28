import * as React from 'react';

const InputField: React.SFC<{
  name: string;
  type: string;
  id: string;
  label: string;
  className?: string;
}> = ({
  name,
  type,
  id,
  label,
  className = '',
}) => (
  <div className={className}>
    <label htmlFor={id} className="flex flex-col">
      <span>{ label }</span>
      <input
        className="px-4 py-2 border rounded-md boder-gray-100"
        type={type}
        name={name}
        id={id}
      />
    </label>
  </div>
);

export default InputField;
