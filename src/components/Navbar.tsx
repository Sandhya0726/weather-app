import { Search } from 'lucide-react';
import type { NavbarProps } from '../types/NavbarProps';

const Navbar = ({ cityName, onChange, handleClick, loading }: NavbarProps) => {
  return (
    <div className="w-full h-[10vh] bg-indigo-950 flex justify-between items-center px-4">
      <h2 className="text-white font-bold">Weather App</h2>
      <div className="w-fit flex justify-end rounded-md bg-white gap-2">
        <input
          className="bg-white px-2 py-2 rounded-md w-[150px] md:w-[400px] outline-none"
          type="search"
          value={cityName}
          onChange={onChange}
          placeholder="Enter city or country name"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClick();
            }
          }}
          disabled={loading}
        />
        <button
          onClick={handleClick}
          className="px-6 bg-gray-300 rounded-r-md text-gray-900 cursor-pointer hover:bg-gray-400 transition-all duration-300 ease-in-out"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-gray-700"></div>
          ) : (
            <Search />
          )}{' '}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
