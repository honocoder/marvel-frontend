import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ComicsByCharacter = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-jm.herokuapp.com/comics/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="comicsByCharacterList">
      <h2>{data.name}</h2>
      <div className="comicItem">
        {data.comics.map((elem, index) => {
          return (
            <div key={elem._id}>
              <span>{elem.title}</span>
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt={elem.title}
              />
              <span>{elem.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicsByCharacter;
