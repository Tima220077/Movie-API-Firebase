import { useState } from "react";
import "./Search.css";
export default function Search({ searchFunc }) {
    let [searchInput, setSearchInput] = useState("");
     function sortVals(val) {
        if (val === "") {
          return;
        }
        searchFunc(val);
        setSearchInput("")
      }    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={() => sortVals(searchInput)}>Submit</button>
        </div>
    );
}