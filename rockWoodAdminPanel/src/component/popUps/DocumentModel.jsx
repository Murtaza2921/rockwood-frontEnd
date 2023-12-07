import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const DocumentModal = ({ document, onClose, onSave }) => {
  const [editedContent, setEditedContent] = useState(document.content);

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-700 opacity-75" onClick={onClose}></div>
      <div className="bg-white p-4 rounded-md z-10">
        <h2 className="text-xl font-semibold mb-4">Edit Document</h2>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full p-2 border rounded"
          style={{ minHeight: '150px' }}
        />
        <div className="flex justify-end mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
