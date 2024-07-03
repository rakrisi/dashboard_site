// CategoryFilter.tsx

import React, { useState, useEffect } from 'react';
import { fetchCategories } from '@/lib/apiService.ts'; // Import your API service
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
interface CategoryFilterProps {
    onSelectCategory: (categoryId: number) => void;
}
function ChevronDownIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}


function FilterIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    )
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<{ id: number; attributes: { name: string } }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<{ id: number; attributes: { name: string } } | null>(null);
    // Add a state to track the selected button
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    //
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
                onSelectCategory(data.data[0].id);
                setSelectedButton(data.data[0].id);// Notify parent component of default selection
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(event.target.value);
        const category = categories.find(cat => cat.id === categoryId);
        setSelectedCategory(category);
        onSelectCategory(categoryId);
        setSelectedButton(categoryId);// Notify parent component of category change
    };

    return (
        <>
            <header className="flex items-center justify-between px-4 py-3 bg-background border-b md:px-6">
                <div className="flex items-center gap-4">
                    <Button>
                        <span className="sr-only m-2">Filter  </span>
                        <span className="ml-2 hidden sm:inline">Filter &nbsp;</span>
                        <FilterIcon className="w-5 h-5"/>
                    </Button>
                    <nav
                        className="inline-flex items-center bg-muted rounded-md px-1 py-2 w-full sm:w-auto hidden md:flex">
                        <span className="text-muted-foreground font-medium hidden sm:inline">Group:</span>
                        {categories.map(category => (
                            <Button
                                className={`font-medium text-black ${selectedButton === category.id ? 'bg-blue-500 rounded text-white hover:text-black hover:bg-gray-400' : ''}`}
                                onClick={() => handleCategoryChange({ target: { value: String(category.id) } } as any)}
                            >{category.attributes.name}</Button>
                        ))}
                    </nav>
                </div>
                <Select onValueChange={(value) => {
                    handleCategoryChange({ target: { value } } as any)
                }}>
                    <SelectTrigger className="w-[180px] md:hidden" >
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map(category => (
                            <SelectItem value={String(category.id)}>{category.attributes.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </header>

        </>);
};

export default CategoryFilter;
