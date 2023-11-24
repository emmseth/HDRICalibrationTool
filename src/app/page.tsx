'use client'

import React, { useState, ChangeEvent, useRef } from 'react';

export default function Home() {
    const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
      const selectedImages = Array.from(event.target.files as FileList);
      setImages(images.concat(selectedImages));
    };
  
    const handleImageDelete = (index: number) => {
      const updatedImages = images.slice();
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    };

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>HDRICalibrationTool</h1>
      <div>
        <h2>Image Upload</h2>
        <input type="file" accept=".jpg, .jpeg" multiple onChange={handleImageSelect} ref={fileInputRef} className="hidden"/>
        <button onClick={handleClick} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-2 border-gray-400 rounded">Select Files</button>
        <div>Image count: {images.length}</div>
        <div className="image-preview flex flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="image-item">
              <div>
                <img src={URL.createObjectURL(image)} alt={`Image ${index}`} width={200} height={200}/>
                <button onClick={() => handleImageDelete(index)}>Delete</button>
                <div>{image.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

