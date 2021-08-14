// Hooks imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import loader from "../assets/iron-man-loader.gif";

// Components imports

// Container logic
const Home = ({ value }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ skip: 0, limit: 100 });
  // const [show, setShow] = useState(false);
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
      <img className="loader" src={loader} alt="Loading..." />
    </div>
  ) : (
    <div className="main">
      <div className="charactersList">
        {data.results.map((character, index) => {
          return (
            <div className="card">
              <div className="character-name">
                <h4>{character.name}</h4>
                <Link to={`/comics/${character._id}`}>
                  <div className="img-group">
                    <img
                      src={
                        character.thumbnail.path +
                        "." +
                        character.thumbnail.extension
                      }
                      alt=""
                      className="char-img"
                    />
                    <div className="overlay">
                      <div className="description">{character.description}</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="nav-btns">
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
    </div>
  );
};

export default Home;
