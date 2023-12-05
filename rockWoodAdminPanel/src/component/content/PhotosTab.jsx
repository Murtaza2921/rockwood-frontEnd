import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const PhotosTab = ({ isSidebarOpen }) => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isRenameMode, setIsRenameMode] = useState(false);
  const [newImageName, setNewImageName] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleImageChange = (event) => {
    const files = event.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleImageUpload = () => {
    Promise.all(
      selectedImages.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              src: reader.result,
              name: newImageName || file.name,
            });
          };
          reader.readAsDataURL(file);
        });
      })
    ).then((loadedImages) => {
      setImages([...images, ...loadedImages]);
      setSelectedImages([]);
      setIsRenameMode(false);
      setNewImageName('');
      setSelectedImageIndex(null);
      fetch('http://localhost:4000/api/images/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ images: loadedImages }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Images uploaded successfully:', data);
        })
        .catch((error) => {
          console.error('Error uploading images:', error);
        });
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setIsRenameMode(false);
    setNewImageName('');
    setSelectedImageIndex(null);
  };

  const handleRenameClick = (index) => {
    setIsRenameMode(true);
    setSelectedImageIndex(index);
    setNewImageName(images[index]?.name || '');
  };

  const handleRenameChange = (event) => {
    setNewImageName(event.target.value);
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${isSidebarOpen ? 'lg:pl-40' : ''}`}>
      <h2 className="text-2xl font-semibold mb-4">Photos Content</h2>

      {/* Image uploader */}
      <label className="block mb-2">
        <input type="file" onChange={handleImageChange} multiple className="hidden" />
        <span className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Select Images
        </span>
      </label>

      {selectedImages.length > 0 && (
        <div className="mb-4">
          <button
            onClick={handleImageUpload}
            className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload Images
          </button>
          {isRenameMode ? (
            <div className="inline-block">
              <input
                type="text"
                placeholder="Enter image name"
                value={newImageName}
                onChange={handleRenameChange}
                className="px-2 py-1 border rounded"
              />
              <button
                onClick={() => {
                  handleImageUpload();
                  setIsRenameMode(false);
                  setNewImageName('');
                  setSelectedImageIndex(null);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsRenameMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Rename
            </button>
          )}
        </div>
      )}

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="bg-white border rounded overflow-hidden">
            <img src={image.src} alt={image.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              {isRenameMode && selectedImageIndex === index ? (
                <input
                  type="text"
                  placeholder="Enter image name"
                  value={newImageName}
                  onChange={handleRenameChange}
                  className="mt-2 px-2 py-1 border rounded w-full"
                />
              ) : (
                <p className="font-semibold">{image.name}</p>
              )}
              <div className="flex">
                <button
                  onClick={() => (isRenameMode ? handleImageUpload() : handleRenameClick(index))}
                  className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {isRenameMode ? 'Save' : 'Rename'}
                </button>
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <FaTrash className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosTab;
