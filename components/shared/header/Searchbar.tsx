import Input from "@/components/ui/Input";
import { IoSearchOutline } from "react-icons/io5";

const Searchbar = () => {
  return (
    <div>
      <form
        //  onSubmit={handleSearchSubmit}
        className="relative"
      >
        <div className="relative">
          <Input
            id="search"
            placeholder={"Search games, brands and more..."}
            className="w-full pr-10"
            // value={query}
            // onClick={handleInputClick}
            // onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary p-2 rounded-full cursor-pointer"
          >
            <IoSearchOutline
              className="w-5 h-5 text-white"
              fill="currentColor"
            />
          </button>
        </div>
        {/* <button
          onClick={() => {
            setQuery("");
            setProductResults([]);
            setCategoryResults([]);
            setIsDropdownOpen(false);
            if (setIsSearchOpen) {
              setIsSearchOpen(false);
            }
          }}
          className="md:hidden absolute -bottom-20 left-1/2 -translate-x-1/2 p-4 bg-background-light dark:bg-background-dark rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <CloseIcon1 />
        </button> */}
      </form>
    </div>
  );
};

export default Searchbar;
