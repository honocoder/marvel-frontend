// Hooks imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components imports

// Container logic
const Home = ({ value }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ skip: 0, limit: 100 });

  // Function to fetch through data using a useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-jm.herokuapp.com/characters?skip=${pagination.skip}&limit=${pagination.limit}&name=${value}`
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
  }, [pagination.skip, pagination.limit, value]);

  return isLoading ? (
    <div className="loading">
      <span>Loading...</span>
      <img src="./assets/iron-man-loader.gif" alt="" />
    </div>
  ) : (
    <div className="main">
      <ul className="charactersList">
        {data.results.map((character, index) => {
          return (
            <li key={character._id}>
              <div className="character-name">
                <h4>{character.name}</h4>
                <Link to={`/comics/${character._id}`}>
                  <img
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt=""
                  />
                </Link>
                <p>{character.description}</p>
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
          newObj.skip += 100;
          setPagination(newObj);
        }}
      >
        Page suivante
      </button>
    </div>
  );
};

export default Home;
