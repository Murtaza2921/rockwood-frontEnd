import React, { useState, useEffect } from 'react';
import { FaTrash,FaEye,FaEdit   } from 'react-icons/fa';
import DocumentModal from '../popUps/DocumentModel'; // Adjust the path based on your project structure

const TextTab = ({ isSidebarOpen }) => {
  const [text, setText] = useState('');
  const [textPreview, setTextPreview] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const [newAttachment, setNewAttachment] = useState(null);
  const [documentId, setDocumentId] = useState(null); // Added state for documentId
  const [showModal, setShowModal] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [documentName, setDocumentName] = useState('');
 

  const maxCharacters = 1000;

  const createDocument = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/documents/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'text',
          content: text,
          attachments: attachments.map((attachment) => attachment.src),
          uploadedBy: 'user123',
          name: documentName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Document created successfully:', data);
        setDocumentId(data._id); // Set the documentId after creating a new document
        setText("");
        setDocumentName("");
      } else {
        console.error('Error creating document:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating document:', error);
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

  const handleTextChange = (event) => {
    const newText = event.target.value;

    if (newText.length <= maxCharacters) {
      setText(newText);
      setCharCount(newText.length);
    }
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  const handleSaveClick = async () => {
   // alert('Text saved!');
    const preview = text.length > maxCharacters ? text.substring(0, maxCharacters) : text;
    setTextPreview(preview);
    await createDocument();
    await handleAttachmentUpload();
    await getAllDocuments();
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    setNewAttachment(file);
  };

  const handleViewDocument = (document) => {
    // Set the selected document for viewing/editing
    setSelectedDocumentId(document);
    setShowModal(true);
    // Open a modal or popup here
    // You can implement the modal to display and edit the document
  };

  const handleSaveEditedDocument = (editedContent) => {
    // Update the document content or save it to the server
    // Here, you can perform the necessary API call to update the document
    // After updating, you may want to fetch the updated list of documents
    // For simplicity, I'll just update the local state
    const updatedDocuments = documents.map((doc) =>
      doc._id === selectedDocumentId._id ? { ...doc, content: editedContent } : doc
    );
    setDocuments(updatedDocuments);
  };

  const handleAttachmentUpload = () => {
    if (newAttachment) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachments([...attachments, { src: reader.result, name: newAttachment.name }]);
        setNewAttachment(null);
      };
      console.log("attachment here : ",setAttachments)
      reader.readAsDataURL(newAttachment);
    }
  };

  const handleRemoveAttachment = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      console.log(documentId);
      const response = await fetch(`http://localhost:4000/api/documents/${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const deletedDocument = await response.json();
        console.log('Document deleted successfully:', deletedDocument);

        // Refresh the documents list after deletion
        getAllDocuments();
      } else {
        console.error('Error deleting document:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedDocumentId(null);
  };

  const handleEditDocument = (document) => {
    console.log("here is the doc : ", document)
    setSelectedDocumentId(document);
    setShowModal(true)
  };

  const handleSaveModal = async (editedContent) => {
    // Assuming you have an update document API endpoint
    try {
      const response = await fetch(`http://localhost:4000/api/documents/${selectedDocumentId._id}`, {
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

    // Close the modal after saving
    handleCloseModal();
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/documents/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'text',
          content: text,
          attachments: attachments.map((attachment) => attachment.src),
          uploadedBy: 'user123',
        }),
      });

      if (response.ok) {
        const updatedDocument = await response.json();
        console.log('Document updated successfully:', updatedDocument);
      } else {
        console.error('Error updating document:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/documents/${documentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const deletedDocument = await response.json();
        console.log('Document deleted successfully:', deletedDocument);
        setDocumentId(null); // Reset documentId after deleting the document
      } else {
        console.error('Error deleting document:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };
  const handleDocumentSelect = (documentId) => {
    setSelectedDocumentId(documentId);
    // You can now use selectedDocumentId to update or delete the document
  };
  return (
    <div className={`container mx-auto px-0 py-8 ${isSidebarOpen ? 'lg:pl-40' : ''}`}>
      <div className="lg:w-3/4 xl:w-2/3">
      <input
  type="text"
  placeholder="Enter document name"
  value={documentName}
  onChange={(e) => setDocumentName(e.target.value)}
  className="mt-2 mb-5 px-2 py-1 border rounded w-full"
/>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={handleTextChange}
          maxLength={maxCharacters}
          placeholder="Type your text here..."
          className="w-full p-2 border rounded"
          style={{ minHeight: '150px' }}
        />

        {/* Character count */}
        <p className="text-sm text-right mt-2">
          {charCount}/{maxCharacters} characters
        </p>

        {/* Save button */}
        <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          onClick={handleSaveClick}
        >
          Save
        </button>

        {/* Attachment uploader */}
        <div className="mt-4">
          <label className="block mb-2 w-96" htmlFor="fileInput">
            <input type="file" id="fileInput" onChange={handleAttachmentChange} className="px-4 py-2 hidden" />
            <span className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
              Attach File
            </span>
          </label>
          {/* <button
            onClick={handleAttachmentUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload Attachment
          </button> */}
        </div>
        </div>
        {/* Attachment Gallery */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {attachments.map((attachment, index) => (
            <div key={index} className="bg-white border rounded overflow-hidden">
              <img
                src={attachment.src}
                alt={attachment.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <p className="font-semibold">{attachment.name}</p>
                <button
                  onClick={() => handleRemoveAttachment(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  <FaTrash className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
{/* Document Gallery */}
<div className="grid grid-cols-2 gap-4 mt-4">
         {documents.map((document) => (
  <div
    key={document._id}
    className="bg-white border rounded overflow-hidden cursor-pointer"
    //onClick={() => handleViewDocument(document)}
  >
    <div className="p-2 flex justify-between items-center">
      <p className="font-semibold">{document.name}</p>
      <div className="flex space-x-2">
                <FaEye onClick={() => handleViewDocument(document)} />
                <FaEdit onClick={() => handleEditDocument(document)} />
                <FaTrash onClick={() => handleDeleteDocument(document._id)} />
              </div>
       
    </div>
  </div>
))}
        </div>

        {/* Text preview */}
        {/* <div className="mt-4 rounded-md border p-4" style={{ overflowWrap: 'break-word' }}>
          <h2 className="text-2xl font-semibold mb-2">Text Preview</h2>
          <p style={{ maxWidth: '100%' }}>{text}</p>
        </div> */}
{/* Document Modal */}
{showModal && (
          <DocumentModal
            document={selectedDocumentId}
            onClose={() => setShowModal(false)}
            onSave={handleSaveEditedDocument}
          />
        )}
        {/* Update and Delete buttons */}
        <div className="mt-4">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={handleUpdateClick}
            disabled={!selectedDocumentId}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            onClick={handleDeleteClick}
            disabled={!selectedDocumentId}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextTab;
