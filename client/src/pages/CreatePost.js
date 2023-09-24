import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import  preview  from '../assets/preview.png';

import { getRandomPrompt } from '../utils';


const CreatePost = () => {

  const {register,handleSubmit,formState:{errors},reset}=useForm();
  const navigate = useNavigate();


  const [form, setForm] = useState({
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  var data;

  const fun=async(take)=>{
  
    console.log(JSON.stringify({prompt:take.prompt}));


      try{

      const response = await fetch("http://localhost:4000/oapp/geti", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: take.prompt,
              }),
            });
       data = await response.json();
      console.log(data);
      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      setGeneratingImg(true);
      }catch(err){
        console.log(err);
        alert(err);
      }


      
        setLoading(true);
              try {
                const response = await fetch('http://localhost:4000/papp/posti', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({photo: `data:image/jpeg;base64,${data.photo}`,name:take.name,prompt:take.prompt}),
                });
        
                await response.json();
                alert('Success');
                // navigate('/');
              } catch (err) {
                alert(err);
              } 

  }

 

  // const handleSurpriseMe = () => {
  //   const randomPrompt = getRandomPrompt(form.prompt);
  //   setForm({ ...form, prompt: randomPrompt });
  // };

  


  return (
    <section className="container mx-auto mt-5">
      <form className="mt-5 max-w-3xl" onSubmit={handleSubmit(fun)}  >
      <div>
        <h1 className="fw-extrabold text-dark fs-10">Create</h1>
        <p className="mt-2 text-muted" style={{ fontSize: '14px', maxWidth: '500px' }}>
  Generate an imaginative image through DALL-E AI and share it with the community
</p>


      </div>

      
  <div className="mb-4">
    <label htmlFor="name" className="form-label">Your Name</label>
    <input
      type="text"
      className="form-control"
      id="name"
      placeholder="Ex., john doe"
    
      name="name"
      {...register("name",{required:true})}
    />
    {errors.name?.type==='required'  && <p className='text-danger'>*pls enter the name</p>}
  </div>

  <div class="mb-4">
    <label htmlFor="prompt" className="form-label">Prompt</label>
    <input
      type="text"
      class="form-control"
      id="prompt"
      placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
      name="prompt"
      {...register("prompt",{required:true})}
    />
     {errors.prompt?.type==='required'  && <p className='text-danger'>*pls enter the prompt</p>}
  </div>

  <div className="mb-4">
    <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-ring-blue-500 focus-ring-opacity-50 w-64 p-3 h-64 flex justify-center items-center">
      {form.photo ? (
        <img
          src={form.photo}
          className="w-100 h-100 object-fit-contain"
        />
      ) : (
        <img
          src={preview}
          alt="preview"
          className="w-20 h-20 object-fit-contain opacity-40"
        />
      )}

      {/* {generatingImg && (
        <div className="position-absolute inset-0 z-0 d-flex justify-content-center align-items-center bg-opacity-50 bg-dark rounded-lg">
          <Loader />
        </div>
      )} */}
    </div>
  </div>

  <div className="mb-4">
    <button
      type="submit"
      
      className="btn btn-dark w-20"
    >
      generate
    </button>
  </div>

  <div className="mb-4">
  <p className="mt-2 text-muted" style={{ fontSize: '14px' }}>
  * Once you have created the image you want, you can share it with others in the community *
</p>

    {/* <button
      type="submit"
      onClick={()=>navigate("/")}
      class="btn btn-primary w-30"
    >
      {loading ? 'Sharing...' : 'Share with the Community'}
    </button> */}
  </div>
</form>

    </section>
  );
};

export default CreatePost;