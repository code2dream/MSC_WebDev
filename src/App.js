import React from 'react';
import "./App.css";
import ReleaseCard from './ReleaseCard';
import Track from './Track';
import { useState, useEffect } from 'react';



function App() {
  const [releases, setReleases] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState();

  const token = "BQAkIX9E33KG4t77IfF9AgOV59jh6RkVQfuI8uurD_RduxWK2W9NtRPpgkQv3uOmmLMnc3PDw0oTa4xVG9PyeJae8PPLtGnon_4pCUHqvFU5Y2xhHyntTaBe7SWxcu9GzbwylINb1yEhLccUpsxw5Xh4TKnfsrW6ZJrq1w7jJaKWqJ9lyNAs5z8TumlwymnTIQGN1cg";

  useEffect( () => {
      async function fetchData(){
        const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
          headers: {
            "Authorization": `Bearer ${token}`
          }

        });
        const data = await response.json();
        const albums = data["albums"]["items"];
        setReleases(albums);

      }
      fetchData();

  }, []);

  useEffect(() => {
    if(!selectedAlbum) {
      return;
    }

    async function fetchData(){
      const albumId = selectedAlbum.id;
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: {
          "Authorization": `Bearer ${token}`

        }
      });
      const data = await response.json();
      const tracks = data["items"];
      setTracks(tracks);
    }
    fetchData();
  }, [selectedAlbum]);

  return(
    <div className='container'>
        <div className='row'>

          <div className='col-9'>
            <div className='row'>
            {releases.map(item => (
              <div className='col-4' style={{margin: "5px"}} key = {item.id} onClick={() => setSelectedAlbum(item)}>
                <ReleaseCard album = {item.name} artist={item["artists"][0]["name"]} image={item.images[0]["url"]} url={item["external_urls"]["spotify"]} id={item.id} />
            </div>
            ))}
            </div>
          </div>

          <div className='col-3'>
            <div className='row'>
            <h2>Tracks</h2>
              {tracks.map(item =>(
                <div className = 'row1'>
                <Track artist={item["artists"][0]["name"]} url={item["external_urls"]["spotify"]} id = {item.id} preview_url={item.preview_url} duration_ms={item.duration_ms} name = {item.name} /> 
              </div>
              ))}
            </div>
          </div>
         
        </div>
    </div>
  );
}

export default App;



