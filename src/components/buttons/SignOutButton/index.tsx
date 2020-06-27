import * as React from 'react';
import Button from '../Button';
import { ArrowRight } from '../../icons';

const SignOutButton: React.SFC<{
  onClick: (event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}> = ({
  onClick: handleClick,
}) => (
  <Button onClick={handleClick} className="flex items-center justify-center group">
    <span className="mr-4 text-xl ease-out group-hover:-translate-x-1 transform transition duration-500">Sign out</span>
    <ArrowRight fill="#ffffff" className="ease-out group-hover:translate-x-2 transform transition transition-transform duration-300" />
  </Button>
);

export default SignOutButton;
