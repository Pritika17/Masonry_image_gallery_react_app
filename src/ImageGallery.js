import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Select from "react-select";
import "./imageGallery.css"

const Gallery = ({ images }) => {
    const [filterValue, setFilterValue] = useState(null)
    const [sortValue, setSortValue] = useState(null)

    const filterOptions = [
        { value: null, label: "All" },
        { value: "portrait", label: "Portrait" },
        { value: "nature", label: "Nature" },
        { value: "city", label: "City" },
        { value: "animals", label: "Animals" }
    ]

    const sortOptions = [
        { value: null, label: "Sort by" },
        { value: "asc", label: "Oldest first" },
        { value: "dsc", label: "Newest first" }
    ]

    const handleFilterChange = (option) => {
        setFilterValue(option.value)
    }

    const handleSortChange = (option) => {
        setSortValue(option.value)
    }

    let filteredImages = images.filter((image) => {
        if (!filterValue) return true;
        return image.category === filterValue
    })

    if (sortValue === "asc") {
        filteredImages = filteredImages.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        )
    } else if (sortValue === "desc") {
        filteredImages = filteredImages.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        )
    }

    const breakpointColumnsObj = {
        default: 3,
        1147: 2,
        750: 1
    }

    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <h2>My Gallery</h2>
                <div className="gallery-controls">
                    <Select
                        className="gallery-select"
                        placeholder="Filter by category"
                        options={filterOptions}
                        onChange={handleFilterChange}
                    />
                    <Select
                        className="gallery-select"
                        placeholder="Sort by date"
                        options={sortOptions}
                        onChange={handleSortChange}
                    />
                </div>
            </div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="gallery-grid"
                columnClassName="gallery-grid-column"
            >
                {filteredImages.map((image) => (
                    <div key={image.id} className="gallery-item">
                        <img src={image.url} alt={image.title} />
                        <div className="gallery-item-info">
                            <h3>{image.title}</h3>
                            <p>Category- {image.category}</p>
                            <p>Date- {new Date(image.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </Masonry>
        </div>
    )
}

export default Gallery