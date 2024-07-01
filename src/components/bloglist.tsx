import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    maxHeight: '80%',
    overflow: 'auto',
    padding: '20px',
  },
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const token = '8b449e9bf7981fdf771156e0bdc31b58079b05e81c2c5f8999ebd2207f07ec5cd6a8c84ada69c65acec18b1d75ad96da8871785d161531b23622abd8238024790d861cc0ccf9483c7e8e8d82ab0963429b07366656f11677a2925c504258eeea9d225f9fa7112ca8c4be8fa54dec69a12ad051b35e853c9a756509d57e61c133';

      const response = await fetch(`http://localhost:1337/api/showcases?filters[category_id][$eq]=1&_page=${currentPage}&_limit=6`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setBlogs(data.data); // Assuming your blogs are in data.data array
      setTotalPages(Math.ceil(data.meta.pagination.total / 1));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setModalIsOpen(true); // Open modal on blog click
  };

  const closeModal = () => {
    setSelectedBlog(null);
    setModalIsOpen(false);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs.map(blog => (
        <div key={blog.id} className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={() => handleBlogClick(blog)}>
          <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Blog Image" className="w-full mb-2 rounded-lg" />
          <h2 className="text-xl font-bold mb-2">{blog.attributes.name}</h2>
          <p>{blog.attributes.description}</p>
        </div>
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Blog Modal"
      >
        {selectedBlog && (
          <div>
            <h2 className="text-xl font-bold mb-2">{selectedBlog.attributes.name}</h2>
            <p>{selectedBlog.attributes.description}</p>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </Modal>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-2 px-4 py-2 rounded ${
              currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
