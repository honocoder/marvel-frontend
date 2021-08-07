// Hooks imports
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Components imports

// Container logic
const ComicsId = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  // Function to fetch through data using a useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-jm.herokuapp.com/comics/${id}`
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
  }, [id]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="main">
      <h2 className="hero-name">{data.name}</h2>
      <ul className="comicItem">
        {data.comics.map((comics, index) => {
          return (
            <li key={comics._id}>
              <span>{comics.title}</span>
              <img
                src={comics.thumbnail.path + "." + comics.thumbnail.extension}
                alt=""
              />
              <span>{comics.description}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ComicsId;
