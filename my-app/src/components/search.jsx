import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement your search logic here or redirect to a search page with the term
  };

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <FormControl
        type="search"
        placeholder="Search Users"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="Primary-Button">
        Search
      </button>
    </Form>
  );
}

export default SearchBar;
