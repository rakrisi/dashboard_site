import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams from React Router
import Modal from 'react-modal';
import CategoryFilter from '@/components/categoryfilter';
import {Button} from "@/components/ui/button.tsx";
import { fetchData, fetchCategories } from '@/lib/apiService.ts'; // Import your API service
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

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
  const { categoryId } = useParams<{ categoryId: string }>(); // Read category ID from URL
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null); // State to track the selected blog
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    fetchCategoriesFromApi();
  }, []);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(parseInt(categoryId, 10)); // Convert string to number
    }
  }, [categoryId]);

  useEffect(() => {
    if (selectedCategory !== null) {
      fetchDataFromApi();
    }
  }, [currentPage, selectedCategory]);

  const fetchCategoriesFromApi = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data.data); // Assuming categories are in data array
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const data = await fetchData(selectedCategory!, currentPage); // Ensure selectedCategory is not null
      setBlogs(data.data); // Assuming your blogs are in data.data array
      setTotalPages(Math.ceil(data.meta.pagination.total / 6));
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

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const formatPublishedDate = (publishedAt) => {
    const date = new Date(publishedAt);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
      <div className="container mx-auto mt-8">
        <CategoryFilter categories={categories} onSelectCategory={handleCategoryChange} />

        {selectedCategory && (
            <div className="bg-blue-200 p-4 rounded-lg shadow-md mb-2">
              <p className="text-muted-foreground">{categories.find(cat => cat.id === selectedCategory)?.attributes.name}</p>
            </div>
        )}<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {blogs.map(blog => (
          <div key={blog.id} className="bg-background rounded-lg overflow-hidden shadow-md transition-all hover:scale-105">
            <a href="#" className="block" >
              <img
                  src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                  alt="Blog Post Image"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{blog.attributes.name}</h3>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {blog.attributes.description}
                </p>
                <Button onClick={() => handleBlogClick(blog)} variant="link" className="text-primary">
                  Read More
                </Button>
              </div>
            </a>
          </div>
          ))}
          </div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customModalStyles}
            contentLabel="Blog Modal"
        >
          {selectedBlog && (
              <div className="p-4">
                <h1 className="text-xl text-center font-bold mb-2">{selectedBlog.attributes.name}</h1>
                <p className="text-gray-700">{selectedBlog.attributes.description}</p>
                <p className="text-sm mt-2">Published At: {formatPublishedDate(selectedBlog.attributes.publishedAt)}</p>
                <BlocksRenderer content={selectedBlog.attributes.content} />
                <div className="mt-4">
                  <a
                      href={selectedBlog.attributes.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View More Info
                  </a>
                </div>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={closeModal}>
                  Close
                </button>
              </div>
          )}
        </Modal>
        <div className="mt-8 flex justify-center">
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
