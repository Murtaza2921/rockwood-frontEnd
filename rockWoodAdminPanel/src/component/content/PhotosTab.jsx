import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const PhotosTab = ({ isSidebarOpen }) => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [renameMode, setRenameMode] = useState(false);
  const [newImageName, setNewImageName] = useState('');

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
              name: renameMode ? (newImageName || file.name) : file.name,
            });
          };
          reader.readAsDataURL(file);
        });
      })
    ).then((loadedImages) => {
      setImages([...images, ...loadedImages]);
      setSelectedImages([]);
      setRenameMode(false);
      setNewImageName('');
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
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
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={renameMode}
              onChange={() => setRenameMode(!renameMode)}
              className="mr-2"
            />
            <span className="text-sm">Enable Rename</span>
          </label>

          {renameMode && (
            <input
              type="text"
              placeholder="Enter image name"
              value={newImageName}
              onChange={(e) => setNewImageName(e.target.value)}
              className="mt-2 px-2 py-1 border rounded"
            />
          )}

          <button
            onClick={handleImageUpload}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload Images
          </button>
        </div>
      )}

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="bg-white border rounded overflow-hidden">
            <img src={image.src} alt={image.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              {renameMode && (
                <input
                  type="text"
                  placeholder="Enter image name"
                  value={image.name}
                  onChange={(e) => handleImageNameChange(e, index)}
                  className="mt-2 px-2 py-1 border rounded w-full"
                />
              )}
              <button
                onClick={() => handleRemoveImage(index)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-full flex items-center"
              >
                <FaTrash className="mr-2" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosTab;
