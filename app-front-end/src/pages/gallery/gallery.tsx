
import React, { useState, useEffect } from 'react';

import axios, { AxiosError, AxiosResponse } from "axios";

interface Albums {
  created_at: string,
  name: string,
  sharable: number,
  images: string,
  updated_at: string
}

interface Photos {
  created_at: string,
  email: string,
  id: number,
  path: string,
  photo_groups: string,
  sharable: number,
  updated_at: string
}


const GalleryPage = () => {

  const [photos, setPhoto] = useState([] as Photos[]);
  const [album, setAlbum] = useState([] as Albums[]);

  useEffect(() => {

    let tk = window.localStorage.getItem("token");
    if (tk != undefined && tk.length > 0) {
      axios.get('http://127.0.0.1:8000/api/gallery', {
        headers: {
          Authorization: `Bearer ${tk}`
        }
      })
        .then(function (response) {
          // handle success
          console.log(response);
          let photos: Array<Photos> = response.data["photos"];
          let albums: Array<Albums> = response.data["albums"];

          console.log("here photos" + photos);
          console.log("here albums" + albums);


          setPhoto(photos);
          setAlbum(album);



        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }

  }, []);

  return (
    <div>
      <h2>Albums</h2>
      <h2>Photos</h2>
      {
        photos.map((item, index) => {
          return <img style={{ width: "200px", height: "200px" }} src={"http://127.0.0.1:8000/" + item.path} />;
        })
      }

    </div>
  )
};

export default GalleryPage;