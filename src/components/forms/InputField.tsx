import * as React from 'react';

const InputField: React.SFC<{
  name: string;
  type: string;
  id: string;
  label: string;
}> = ({
  name,
  type,
  id,
  label,
}) => (
  <div>
    <label htmlFor={id} className="flex flex-col">
      <span>{ label }</span>
      <input
        className="rounded-md border boder-gray-100 px-4 py-2"
        type={type}
        name={name}
        id={id}
      />
    </label>
  </div>
);

export default InputField;
