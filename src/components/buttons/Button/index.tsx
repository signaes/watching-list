import * as React from 'react';

const Button: React.SFC<{
  type?: 'button' | 'submit' | 'reset';
  onClick: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  className?: string;
  children: React.Component | React.Component[] | JSX.Element | JSX.Element[] | string;
}> = ({
  type = 'button',
  onClick: handleClick,
  className = '',
  children,
}) => (
  <button
    className={`px-6 py-4 text-white bg-gray-800 border-gray-800 rounded-md transition ease-in-out duration-500 transition-all hover:bg-gray-900 hover:shadow-lg ${className}`}
    type={type}
    onClick={handleClick}
  >
    { children }
  </button>
);

export default Button;
