import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function MovieForm() {
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        poster_path: '',
        ott_release_date: '',
        ott_platform: '',
        cbfc: '',
        runtime: 0,
        rating: 0.0,
        ott_id: '',
        languages: []
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // If it's a checkbox, update the array of selected values
            if (checked) {
                setFormData({ ...formData, [name]: [...formData[name], value] });
            } else {
                // Remove the value if unchecked
                setFormData({
                    ...formData,
                    [name]: formData[name].filter((item) => item !== value),
                });
            }
        } else {
            // For other input types, update as usual
            setFormData({ ...formData, [name]: value });
        }

        // setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to an API
        console.log(JSON.stringify(formData));
    };

    return (
         <div>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="id"
                    placeholder="Id"
                    value={formData.id}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="poster_path"
                    placeholder="PosterPath"
                    value={formData.poster_path}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="ott_release_date"
                    placeholder="OTTReleaseDate"
                    value={formData.ott_release_date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="ott_platform"
                    placeholder="OTTPlatform"
                    value={formData.ott_platform}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="cbfc"
                    placeholder="CBFC"
                    value={formData.cbfc}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="runtime"
                    placeholder="Runtime"
                    value={formData.runtime}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="rating"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="ott_id"
                    placeholder="OTTId"
                    value={formData.ott_id}
                    onChange={handleChange}
                />
                <label>
                    Languages:
                    <input
                        type="checkbox"
                        name="languages"
                        value="Te"
                        checked={formData.languages.includes('Te')}
                        onChange={handleChange}
                    />{' '}
                    Telugu
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="languages"
                        value="Hi"
                        checked={formData.languages.includes('Hi')}
                        onChange={handleChange}
                    />{' '}
                    Hindi
                </label>
                {/* Add more input fields as needed */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default MovieForm;
