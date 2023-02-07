import React from 'react';
import { getRandomPrompts } from '../utils';
import { Form, Loader } from '../components';
import { useNavigate } from 'react-router-dom';
import { MdOutlineBrokenImage } from 'react-icons/md';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generateImage, setGenerateImage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleGenerateImage() {
    if (form.prompt) {
      try {
        setGenerateImage(true);
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_MAIN_API}/v1/dalle`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGenerateImage(false);
      }
    } else {
      alert('please enter a prompt');
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_MAIN_API}/v1/post`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate('/');
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('please enter a prompt and generate an image');
    }
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSurpriseMe() {
    const handleRandomPrompt = getRandomPrompts(form.prompt);
    setForm({ ...form, prompt: handleRandomPrompt });
  }
  return (
    <div className="mx-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] maw-x[500px]">Browse through a collection of imaginative and visually stunning images through by DALL-E AI and share them with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <Form labelName="Your Name" type="text" name="name" placeholder="input your name" value={form.name} handleChange={handleChange} />
          <Form labelName="Prompt" type="text" name="prompt" placeholder="an astronaut lounging in a tropical resort in space, vaporwave" value={form.prompt} handleChange={handleChange} handleSurprise={handleSurpriseMe} isSurpriseMe />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" /> : <MdOutlineBrokenImage size="8rem" color="#949494" />}

            {generateImage && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 gap-5">
          <button type="button" onClick={handleGenerateImage} className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {generateImage ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Once you have created image you want, you can share it other in the community</p>
          <button type="submit" className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
