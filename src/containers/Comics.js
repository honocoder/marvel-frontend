// Hooks imports
import { useState, useEffect } from "react";
import axios from "axios";
import loader from "../assets/iron-man-loader.gif";

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
        console.log(response.data.results[0]);
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
      <div className="comics-list">
        {data.results.map((comic, index) => {
          return (
            <div className="comic-card">
              <div className="comic-name">
                <h4>{comic.title}</h4>
                <div className="img-group">
                  <img
                    src={comic.thumbnail.path + "." + comic.thumbnail.extension}
                    alt=""
                    className="comic-img"
                  />
                  <div className="overlay">
                    <div className="description">{comic.description}</div>
                  </div>
                </div>
                {/* <div className="comic-desc"> */}

                {/* </div> */}
              </div>
            </div>
          );
        })}
      </div>

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

export default Comics;
