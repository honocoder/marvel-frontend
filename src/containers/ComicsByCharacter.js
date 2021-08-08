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
        console.log(response.data);
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
    <div className="cbc-main">
      <div className="cbc-title-and-img">
        <h2>{data.name}</h2>
        <img
          src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
          alt=""
        />
      </div>
      <div className="comicsByCharacterList">
        {data.comics.map((elem, index) => {
          return (
            <div className="comicItem">
              <div key={elem._id}>
                <span className="cbc-comic-title">{elem.title}</span>
                <div className="cbc-img-group">
                  <img
                    src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                    alt={elem.title}
                    className="cbc-img"
                  />
                  <div className="cbc-overlay">
                    <div className="cbc-description">{elem.description}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicsByCharacter;
