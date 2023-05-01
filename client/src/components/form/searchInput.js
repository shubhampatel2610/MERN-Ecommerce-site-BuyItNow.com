import React from "react";
import { UseSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = UseSearch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search products..."
          aria-label="Search"
          value={values.keyword}
          onChange={(event) =>
            setValues({ ...values, keyword: event.target.value })
          }
        />
        <button
          className="btn btstrp-buttons"
          style={{ color: "white", marginRight: "40px" }}
          type="submit"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
