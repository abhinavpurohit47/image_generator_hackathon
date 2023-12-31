import React,{useRef, useState} from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/default_image.svg'



const ImageGenerator = () => {

    const [image_url,setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading,setLoading] = useState(false);

    const ImageGenerator = async() => {
        if(inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization:
                    "",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size: "512x512",
                }),
            }
        );
        let data = await response.json();
        console.log(data);

        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }

  return (
    <div className='ai-image-generator'>
        <div className='header'> AI image <span>
            generator
        </span>
            </div>
            <div className='img-loading'>
<div className="image">
    <img src={image_url==="/"?default_image: image_url} ref={inputRef} alt=" default" />

<div className="loading">
    <div className={loading?"loading-bar-full" : "loading-bar"}></div>

        <div className={loading?"loading-text":"display-none"}>
            Loading...
    </div>
</div>
</div>
            </div>
            <div className="search-box">
                <input className="search-input" type="text"  placeholder ='Describe what you want'></input>
            <div className="generate-btn" onClick={() => {ImageGenerator()}} >Generate</div>
            </div>
            </div>
  )
}

export default ImageGenerator