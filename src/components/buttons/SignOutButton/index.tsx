import * as React from 'react';
import { ArrowRight } from '../../icons';

const SignOutButton: React.SFC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  className?: string;
}> = ({
  onClick: handleClick,
  className = '',
}) => (
  <button type="button" onClick={handleClick} className={`flex items-center justify-center group ${className}`}>
    <span className="mr-4 text-base ease-out group-hover:-translate-x-1 transform transition duration-500">Sign out</span>
    <ArrowRight fill="#000000" className="ease-out group-hover:translate-x-2 transform transition transition-transform duration-300" />
  </button>
);

export default SignOutButton;
