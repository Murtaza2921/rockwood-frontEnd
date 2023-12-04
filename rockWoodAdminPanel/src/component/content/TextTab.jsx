import React, { useState } from 'react';

const TextTab = ({ isSidebarOpen }) => {
  const [text, setText] = useState('');
  const [textPreview, setTextPreview] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxCharacters = 1000;

  const handleTextChange = (event) => {
    const newText = event.target.value;

    if (newText.length <= maxCharacters) {
      setText(newText);
      setCharCount(newText.length);
    }
  };

  const handleSaveClick = () => {
    // Handle save logic here
    alert('Text saved!');

    // Set the text preview after saving
    const preview = text.length > maxCharacters ? text.substring(0, maxCharacters) : text;
    setTextPreview(preview);
  };

  return (
    <div className={`container mx-auto px-0 py-8 ${isSidebarOpen ? 'lg:pl-40' : ''}`}>
      <div className="lg:w-3/4 xl:w-2/3">
        {/* Textarea */}
        <textarea
          value={text}
          onChange={handleTextChange}
          maxLength={maxCharacters}
          placeholder="Type your text here..."
          className="w-full p-2 border rounded"
          style={{ minHeight: '150px' }} // Adjust the height as needed
        />

        {/* Character count */}
        <p className="text-sm text-right mt-2">
          {charCount}/{maxCharacters} characters
        </p>

        {/* Save button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={handleSaveClick}
        >
          Save
        </button>

        {/* Text preview */}
        <div className="mt-4 rounded-md border p-4" style={{ overflowWrap: 'break-word' }}>
          <h2 className="text-2xl font-semibold mb-2">Text Preview</h2>
          <p style={{ maxWidth: '100%' }}>{textPreview}</p>
        </div>
      </div>
    </div>
  );
};

export default TextTab;



