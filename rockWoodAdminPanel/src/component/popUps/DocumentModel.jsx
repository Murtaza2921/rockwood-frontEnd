import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const DocumentModal = ({ document, onClose, onSave  }) => {
  const [editedContent, setEditedContent] = useState(document.content);

  const handleSave = () => {
    onSave(editedContent);
    handleSaveModal(editedContent);
    onClose();
  };
  const handleSaveModal = async (editedContent) => {
    // Assuming you have an update document API endpoint
    try {
      const response = await fetch(`http://localhost:4000/api/documents/${document._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });

      if (response.ok) {
        const updatedDocument = await response.json();
        console.log('Document updated successfully:', updatedDocument);

        // Refresh the documents list after update
        getAllDocuments();
      } else {
        console.error('Error updating document:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  const getAllDocuments = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/documents/getAll');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data); // Update the list of documents
        console.log(data);
      } else {
        console.error('Error getting all documents:', response.statusText);
      }
    } catch (error) {
      console.error('Error getting all documents:', error);
    }
  };
 
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-700 opacity-75" onClick={onClose}></div>
      <div className="bg-white p-4 rounded-md z-10">
        <h2 className="text-xl font-semibold mb-4">{document.name}</h2>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full p-2 border rounded"
          style={{ minHeight: '50vh',minWidth:'70vh' }}
        />
        {console.log("isEdite : ",check)}
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
