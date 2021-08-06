// Hooks imports
import { useState, useEffect } from "react";
import axios from "axios";

// Components imports

// Container logic
const Comics = ({ value }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ skip: 0, limit: 100 });

  // Function to fetch through data using a useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-jm.herokuapp.com/comics?skip=${pagination.skip}&limit=${pagination.limit}&title=${value}`
        );
        console.log("Data ===>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    // Call of the fetching function
    fetchData();
  }, []);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="main">
      <ul className="comicsList">
        {data.results.map((comic, index) => {
          return (
            <li key={comic._id}>
              <div className="comic-name">
                <h4>{comic.name}</h4>
                <img
                  src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                  alt=""
                />
                <p>{comic.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {pagination.skip >= 100 && (
        <button
          onClick={() => {
            const newObj = { ...pagination };
            newObj.skip -= 100;
            setPagination(newObj);
          }}
        >
          Page précédente
        </button>
      )}
      <button
        onClick={() => {
          const newObj = { ...pagination };
          newObj.skip -= 100;
          setPagination(newObj);
        }}
      >
        Page suivante
      </button>
    </div>
  );
};

export default Comics;
