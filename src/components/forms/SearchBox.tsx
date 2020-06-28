import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Search } from '../icons';
import Display from '../Display';

const { useState } = React;

const SearchBox: React.SFC<{
  onSearch: any;
  isLoading: boolean;
}> = ({ onSearch: handleSearch, isLoading }) => {
  const [value, setValue] = useState('');
  const handleChange = ({ target }: React.SyntheticEvent) => {
    const { value: targetValue } = target as HTMLInputElement;

    setValue(targetValue);
  };
  const handleSubmit = () => handleSearch({ query: value });
  const handleEnter = ({ key }: { key: string }) => (key as string) === 'Enter'
    ? handleSubmit()
    : () => null;

  return (
    <div
      className={`transition transition-opacity duration-500 flex items-stretch justify-center overflow-hidden border boder-gray-100 rounded-md ${isLoading ? 'opacity-50' : ''}`}
    >
      <input
        className="flex-1 px-4 py-2 bg-gray-100"
        type="text"
        name="search"
        id="search"
        placeholder="Search videos"
        onChange={handleChange}
        onKeyUp={handleEnter}
        disabled={isLoading}
      />
      <button
        className="flex items-center justify-center px-4 bg-gray-100"
        type="submit"
        onClick={handleSubmit}
      >
        <Display condition={isLoading}>
          <ClipLoader
            size={18}
            color="000000"
            loading={isLoading}
          />
        </Display>
        <Display condition={!isLoading}>
          <Search />
        </Display>
      </button>
    </div>
  );
};

export default SearchBox;
