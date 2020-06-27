import * as React from 'react';

const Display: React.SFC<{ children: React.ReactNode, condition: boolean }> = function Display({
  children,
  condition,
}): React.ReactElement | null {
  return condition ? (children as React.ReactElement) : null;
};

export default Display;
