import { useState, useEffect } from "react";
import AddMediaForm from "./components/AddMediaForm";
import MediaTable from "./components/MediaTable";
import { listMedia } from "./services/media.service";
import Filter from "./components/Filter";
import "./sass/App.scss";
import { usePalette } from "react-palette";

function App() {
  const [mediaList, setMediaListTo] = useState([]);
  const [filters, setFilters] = useState({
    sortBy: { prop: "Personal Rating", desc: true },
    mediaType: "",
    watchStatus: "",
  });
  
  const [imgUrl, setImgUrl] = useState("")
  const imgUrlUtils = {imgUrl: imgUrl, setImgUrl: setImgUrl}
  const { data, loading, error } = usePalette(imgUrl);

  const filterProps = { filters, setFilters };

  const updateMediaList = () => {
    listMedia(filters)
      .then((mediaList) => setMediaListTo(mediaList))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    updateMediaList();
  }, [filters]);

  return (
    <>
      {/* <div className="banner" style={{ backgroundColor: data.vibrant }}> */}
      <div
        className="banner"
        style={{
          background: `linear-gradient(${data.vibrant}, rgb(255, 255, 255)`,
        }}
      >
        <h1>Watch Next?</h1>
      </div>
      <div className="columns">
        <div className="rows">
          <Filter filterProps={filterProps} />
          <AddMediaForm updateMediaList={updateMediaList} />
        </div>
        <MediaTable
          mediaList={mediaList}
          updateMediaList={updateMediaList}
          show={filters.watchStatus}
          imgUrlUtils={imgUrlUtils}
        />
      </div>
    </>
  );
}

export default App;
