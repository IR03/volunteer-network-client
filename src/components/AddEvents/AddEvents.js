import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddEvents = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [imageURL, setImageURL] = useState(null);
  
  const onSubmit = data => {
    const eventData = {
      name: data.name,
      imageURL : imageURL
    };
    const url = `http://localhost:5001/addEvent`;

    // console.log(eventData);
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then(res =>console.log('server side res',res))
  };

  const handleImageUpload = event => {
    // console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set('key', 'c6d14e3addc2effc4f2f2eb441b09e2c');
    imageData.append('image', event.target.files[0]);


    axios.post('https://api.imgbb.com/1/upload',imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <div>
      <h1>Add your awesome Event here</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue="New exciting Event" ref={register} />
        <br />
        <input type="file" name="exampleRequired" onChange={handleImageUpload} />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddEvents;