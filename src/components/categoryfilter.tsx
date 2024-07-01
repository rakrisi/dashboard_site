// CategoryFilter.tsx

import React, { useState, useEffect } from 'react';
import { fetchCategories } from '@/lib/apiService.ts'; // Import your API service

interface CategoryFilterProps {
    onSelectCategory: (categoryId: number) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<{ id: number; attributes: { name: string } }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ id: number; attributes: { name: string } } | null>(null);

    useEffect(() => {
        fetchCategoriesFromApi();
    }, []);

    const fetchCategoriesFromApi = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data.data); // Assuming categories are in data array

            // Set default category to the first category in the array
            if (data.data.length > 0) {
                setSelectedCategory(data.data[0]);
                onSelectCategory(data.data[0].id); // Notify parent component of default selection
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(event.target.value);
        const category = categories.find(cat => cat.id === categoryId);
        setSelectedCategory(category);
        onSelectCategory(categoryId); // Notify parent component of category change
    };

    return (
        <div className="mt-4 flex justify-center">
           <span className="p-2"> Select Category: </span>
            <select className="p-2 rounded border" onChange={handleCategoryChange} value={selectedCategory ? selectedCategory.id : ''}>
                <option value="" disabled>Select a category...</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.attributes.name}</option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
