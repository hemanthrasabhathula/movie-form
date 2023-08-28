import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import './MovieForm.css';

function MovieForm() {
    const [formData, setFormData] = useState({
        id: '',
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
    //let finalFormData = {};
    // const [finalFormData, setFinalFormData] = useState({
    //     id: 0,
    //     title: '',
    //     poster_path: '',
    //     ott_release_date: '',
    //     ott_platform: '',
    //     cbfc: '',
    //     runtime: 0,
    //     rating: 0.0,
    //     ott_id: '12345',
    //     languages: []
    //     // Add more fields as needed
    // });
    //const [finalFormData, setFinalFormData] = useState(null);

    const [finalFormData, setFinalFormData] = useState({
        id: '',
        title: '',
        poster_path: '',
        ott_release_date: '',
        ott_platform: '',
        cbfc: '',
        runtime: 0,
        rating: 0.0,
        ott_id: '',
        languages: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // If it's a checkbox, update the array of selected values
            if (checked) {
                setFormData({ ...formData, [name]: [...formData[name], value.trim()] });
            } else {
                // Remove the value if unchecked
                setFormData({
                    ...formData,
                    [name]: formData[name].filter((item) => item !== value.trim()),
                });
            }
        } else {
            // For other input types, update as usual

            // if(name === 'id'){
            //     setFormData({ ...formData, [name]: Number(extractMovieId(value)) });
            // }else{
            setFormData({ ...formData, [name]: value.trim() });
            // }
        }

        // switch (type) {
        //     case 'checkbox':
        //       if (checked) {
        //         setFormData({ ...formData, [name]: [...formData[name], value] });
        //       } else {
        //         setFormData({
        //           ...formData,
        //           [name]: formData[name].filter((item) => item !== value),
        //         });
        //       }
        //       break;
        //     default:
        //       setFormData({ ...formData, [name]: value });
        //       break;
        //   }


        // setFormData({ ...formData, [name]: value });
    };

    const extractFilename = (url) => {
        // Check if 'name' is a URL ending with .jpg or .png
        if (url !== undefined) {
            if (url.endsWith('.jpg') || url.endsWith('.png')) {
                // Use regular expressions to extract the filename
                const matches = url.match(/\/([^/]+)\.(jpg|png)$/);
                if (matches && matches.length === 3) {
                    const filename = matches[0]; // Extracted filename
                    return filename;
                }
            }
        }
        return 'Invalid URL or extension';
    };

    const extractMovieId = (url) => {
        // Check if 'name' is a URL ending with .jpg or .png
        if (url !== undefined) {
            if (/^[0-9]+$/.test(url)) {
                return url;
            }
            const numbersArray = url.match(/\/(\d+)(?:[^\d]|$)/);
            if (numbersArray) {
                // Extracted numbers will contain '/' at the beginning, so we need to remove it
                const cleanedNumbersArray = numbersArray[1]
                return cleanedNumbersArray;
            }
        }
        return 'Invalid URL or extension';
    };

    function extractStringFromLastSlash(inputString) {
        const lastSlashIndex = inputString.lastIndexOf('/');

        if (lastSlashIndex !== -1) {
            return inputString.substring(lastSlashIndex + 1);
        } else {
            return inputString; // If there is no '/', return the original string
        }
    }

    function extractStringFromSecondToLastSlash(inputString) {
        const lastSlashIndex = inputString.lastIndexOf('/');

        if (lastSlashIndex !== -1) {
            const secondToLastSlashIndex = inputString.lastIndexOf('/', lastSlashIndex - 1);

            if (secondToLastSlashIndex !== -1) {
                return inputString.substring(secondToLastSlashIndex + 1);
            }
        }

        return inputString; // Return the original string if there is no second-to-last '/'
    }

    function extractStringFromThirdToLastSlash(inputString) {
        const lastSlashIndex = inputString.lastIndexOf('/');

        if (lastSlashIndex !== -1) {
            const secondToLastSlashIndex = inputString.lastIndexOf('/', lastSlashIndex - 1);

            if (secondToLastSlashIndex !== -1) {
                const thirdToLastSlashIndex = inputString.lastIndexOf('/', secondToLastSlashIndex - 1);

                if (thirdToLastSlashIndex !== -1) {
                    return inputString.substring(thirdToLastSlashIndex + 1);
                }
            }

        }

        return inputString; // Return the original string if there is no second-to-last '/'
    }

    function extractStringFromLastEqualTo(inputString) {

        const regex = /gti=([^&]+)/;
        const match = inputString.match(regex);

        if (match) {
            // match[1] contains the extracted letters
            return match[1];
        }

        const lastEqualToIndex = inputString.lastIndexOf('=');

        if (lastEqualToIndex !== -1) {
            return inputString.substring(lastEqualToIndex + 1);
        } else {
            return inputString; // If there is no '=', return the original string
        }
    }
    function replacer(key, value) {
        // Filtering out properties
        if (key === 'id' || key === 'runtime')
            value = Number(value)
        if (key === 'rating')
            value = parseFloat(value)
        return value
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to an API

        const formCopied = { ...formData };
        //setFinalFormData({...formData})
        //const formCopy =  _.cloneDeep({...formData});
        //setFinalFormData(formCopy)
        //finalFormData = _.cloneDeep(formData);
        //finalFormData = { ...formData }

        //finalFormData = {...formData};
        // finalFormData = JSON.parse(JSON.stringify(formData));
        formCopied.poster_path = extractFilename(formData.poster_path)
        formCopied.id = Number(extractMovieId(formData.id))
        //setFinalFormData({ ...formData, poster_path: extractFilename(formData.poster_path) });

        //setFinalFormData({ ...formData });


        switch (formData.ott_platform) {

            case 'Aha':
                formCopied.ott_id = extractStringFromLastSlash(formData.ott_id)
                break;
            case 'Hotstar':
                //setFinalFormData({ ...formData, ott_id: extractStringFromSecondToLastSlash(formData.ott_id) });
                formCopied.ott_id = extractStringFromSecondToLastSlash(formData.ott_id)
                break;
            case 'Netflix':
                formCopied.ott_id = extractStringFromLastSlash(formData.ott_id)
                break;
            case 'Prime Video':
                formCopied.ott_id = extractStringFromLastEqualTo(formData.ott_id)
                break;
            case 'Sony LIV':
                formCopied.ott_id = extractStringFromLastSlash(formData.ott_id)
                break;
            case 'Sun NXT':
                formCopied.ott_id = extractStringFromThirdToLastSlash(formData.ott_id)
                break;
            case 'ZEE5':
                formCopied.ott_id = extractStringFromSecondToLastSlash(formData.ott_id)
                break;
            default:
                formCopied.ott_id = formData.ott_id

        }

        setFinalFormData(formCopied);
        console.log(JSON.stringify(formCopied));

    };




    return (
        <div>
            <Container >
                <h1 as={Row} >Movie-Form</h1>
                <div className="row">
                    <div className="col-sm-5" >

                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Id</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        name="id"
                                        placeholder="Id"
                                        value={formData.id}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Title</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">PosterPath</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        name="poster_path"
                                        placeholder="PosterPath"
                                        value={formData.poster_path}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            {/* {finalFormData && <p>Extracted Filename: {finalFormData.poster_path}</p>} */}
                            <Form.Group as={Row} >
                                <Form.Label column sm="3">OTTReleaseDate</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="date"
                                        name="ott_release_date"
                                        placeholder="OTTReleaseDate"
                                        value={formData.ott_release_date}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm="3">OTTPlatform </Form.Label>
                                <Col sm="9">
                                    <Form.Check
                                        inline
                                        label="Aha"
                                        type="radio"
                                        name="ott_platform"
                                        value="Aha"
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Hotstar"
                                        type="radio"
                                        name="ott_platform"
                                        value="Hotstar"
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Netflix"
                                        type="radio"
                                        name="ott_platform"
                                        value="Netflix"
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Prime Video"
                                        type="radio"
                                        name="ott_platform"
                                        value="Prime Video"
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Sony LIV"
                                        type="radio"
                                        name="ott_platform"
                                        value="Sony LIV"
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Sun NXT"
                                        type="radio"
                                        name="ott_platform"
                                        value="Sun NXT"
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="ZEE5"
                                        type="radio"
                                        name="ott_platform"
                                        value="ZEE5"
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" >CBFC</Form.Label>
                                <Col sm="9">
                                    <Form.Check
                                        inline
                                        label="U/A"
                                        type="radio"
                                        name="cbfc"
                                        value="U/A"
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="U"
                                        type="radio"
                                        name="cbfc"
                                        value="U"
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="A"
                                        type="radio"
                                        name="cbfc"
                                        value="A"
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row}  >
                                <Form.Label column sm="3" >Runtime</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="number"
                                        name="runtime"
                                        placeholder="Runtime"
                                        value={formData.runtime}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" >Rating</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        name="rating"
                                        placeholder="Rating"
                                        value={formData.rating}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" >OTTId</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="text"
                                        name="ott_id"
                                        placeholder="OTTId"
                                        value={formData.ott_id}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            {/* {finalFormData && <p>{finalFormData.ott_id}</p>} */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Languages: </Form.Label>
                                <Col sm="9">
                                    <Form.Check
                                        inline
                                        label="Telugu"
                                        type="checkbox"
                                        name="languages"
                                        value="Te"
                                        checked={formData.languages.includes('Te')}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Hindi"
                                        type="checkbox"
                                        name="languages"
                                        value="Hi"
                                        checked={formData.languages.includes('Hi')}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Tamil"
                                        type="checkbox"
                                        name="languages"
                                        value="Ta"
                                        checked={formData.languages.includes('Ta')}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Kannada"
                                        type="checkbox"
                                        name="languages"
                                        value="Kn"
                                        checked={formData.languages.includes('Kn')}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Malayalam"
                                        type="checkbox"
                                        name="languages"
                                        value="Ml"
                                        checked={formData.languages.includes('Ml')}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="English"
                                        type="checkbox"
                                        name="languages"
                                        value="En"
                                        checked={formData.languages.includes('En')}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Button className="col-md-12" variant="primary" type="submit">
                                Submit
                            </Button>

                        </Form>
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="col-sm-5" >
                        <textarea readOnly value={JSON.stringify(finalFormData, replacer, 4)} cols="60" rows="19"></textarea>
                    </div>
                </div>
            </Container>

        </div>
    );
}

export default MovieForm;
