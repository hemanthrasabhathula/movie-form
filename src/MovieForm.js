import React, { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import './MovieForm.css';
import MovieFormService from './MovieFormService';
import * as constants from './Constants';

function MovieForm() {
    const movieFormService = new MovieFormService();
    const [formData, setFormData] = useState({

        id: '',
        title: '',
        poster_path: '',
        ott_release_date: '',
        ott_platform: '',
        cbfc: '',
        runtime: '',
        rating: '',
        ott_id: '',
        languages: []

    });

    const initialFormData = {
        formData: {
            id: '',
            title: '',
            poster_path: '',
            ott_release_date: '',
            ott_platform: '',
            cbfc: '',
            runtime: '',
            rating: '',
            ott_id: '',
            languages: []
        }
    }

    const [finalFormData, setFinalFormData] = useState({
        id: '',
        title: '',
        poster_path: '',
        ott_release_date: '',
        ott_platform: '',
        cbfc: '',
        runtime: '',
        rating: '',
        ott_id: '',
        languages: []
    });


    const [runtimehr, setRuntimehr] = useState('');
    const [runtimemin, setRuntimemin] = useState('');

    const handleHoursChange = (event) => {

        const hrValue = event.target.value > 12 ? 0 : event.target.value;
        const minValue = runtimemin;
        const result = Number(hrValue) * 60 + Number(minValue);
        setFormData({ ...formData, 'runtime': result });
        setRuntimehr(hrValue);

    }

    const handleMinutesChange = (event) => {
        const hrValue = runtimehr;
        const minValue = event.target.value > 60 ? 0 : event.target.value;
        const result = Number(hrValue) * 60 + Number(minValue);
        setFormData({ ...formData, 'runtime': result });
        setRuntimemin(minValue);
    }


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            // If it's a checkbox, update the array of selected values
            if (name === 'allLanguages') {

                if (checked) {
                    setFormData({ ...formData, languages: constants.allLanguages });
                } else {
                    setFormData({ ...formData, languages: [] });
                }

            } else {
                if (checked) {
                    setFormData({ ...formData, [name]: [...formData[name], value.trim()] });
                } else {
                    // Remove the value if unchecked
                    setFormData({
                        ...formData,
                        [name]: formData[name].filter((item) => item !== value.trim()),
                    });
                }
            }
        } else {

            if (name === 'ott_id') {
                setFormData({ ...formData, ott_platform: movieFormService.getottPlatformVal(value.trim()), [name]: value.trim() });
                //handleOttIdChange(e);
            } else {
                setFormData({ ...formData, [name]: value.trim() });
            }
        }

    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to an API
        const formCopied = { ...formData };

        formCopied.poster_path = movieFormService.extractFilename(formData.poster_path)
        formCopied.id = Number(movieFormService.extractMovieId(formData.id))
        formCopied.ott_id = movieFormService.getFormattedOttId(formData.ott_platform, formData.ott_id);

        setFinalFormData(formCopied);
        console.log(JSON.stringify(formCopied));

    };

    const handleReset = (e) => {
        e.preventDefault();
        setFormData(initialFormData.formData);
        setRuntimehr(initialFormData.formData.runtime);
        setRuntimemin(initialFormData.formData.runtime);
        setFinalFormData(initialFormData.formData);
    };

    const textareaRef = useRef(null);

    useEffect(() => {

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const calculatedHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${calculatedHeight}px`;
        }
    }, [finalFormData]);

    const handleTextareaFocus = () => {

        if (JSON.stringify(finalFormData) !== JSON.stringify(initialFormData.formData)) {
            // Select the text inside the textarea
            textareaRef.current.select();
            // Use the Clipboard API to copy the selected text to clipboard
            navigator.clipboard.writeText(textareaRef.current.value).then(() => {
                console.log('Text successfully copied to clipboard');
            }).catch((err) => {
                console.error('Failed to copy text: ', err);
            });
        }
    };

    return (
        <div>
            <Container >
                <h1 as={Row} > {formData.title === '' ? 'Movie-Form' : formData.title}</h1>
                <Form onSubmit={handleSubmit} style={{ padding: "10px" }}>
                    <div className="row">
                        <div className="col-sm-5" >


                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Id</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        required
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
                                        required
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={formData.title}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Poster Path</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        required
                                        type="text"
                                        name="poster_path"
                                        placeholder="Poster Path"
                                        value={formData.poster_path}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            {/* {finalFormData && <p>Extracted Filename: {finalFormData.poster_path}</p>} */}
                            <Form.Group as={Row} >
                                <Form.Label column sm="3">Release Date</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        required
                                        type="date"
                                        name="ott_release_date"
                                        placeholder="OTTReleaseDate"
                                        value={formData.ott_release_date}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm="3">Platform</Form.Label>
                                <Col sm="9">
                                    <Form.Check
                                        required
                                        inline
                                        label="Aha"
                                        type="radio"
                                        name="ott_platform"
                                        value={constants.AHA}
                                        checked={formData.ott_platform === constants.AHA}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Hotstar"
                                        type="radio"
                                        name="ott_platform"
                                        value={constants.HOTSTAR}
                                        checked={formData.ott_platform === constants.HOTSTAR}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Netflix"
                                        type="radio"
                                        name="ott_platform"
                                        value={constants.NETFLIX}
                                        checked={formData.ott_platform === constants.NETFLIX}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Prime Video"
                                        type="radio"
                                        name="ott_platform"
                                        value={constants.PRIMEVIDEO}
                                        checked={formData.ott_platform === constants.PRIMEVIDEO}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Sony LIV"
                                        type="radio"
                                        name="ott_platform"
                                        value={constants.SONYLIV}
                                        checked={formData.ott_platform === constants.SONYLIV}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="Sun NXT"
                                        type="radio"
                                        name="ott_platform"
                                        value={constants.SUNNXT}
                                        checked={formData.ott_platform === constants.SUNNXT}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="ZEE5"
                                        type="radio"
                                        name="ott_platform"
                                        value={constants.ZEE5}
                                        checked={formData.ott_platform === constants.ZEE5}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row}>
                                <Form.Label column sm="3" >Cbfc</Form.Label>
                                <Col sm="9">
                                    <Form.Check
                                        required
                                        inline
                                        label="U/A"
                                        type="radio"
                                        name="cbfc"
                                        value="U/A"
                                        checked={formData.cbfc === "U/A"}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="U"
                                        type="radio"
                                        name="cbfc"
                                        value="U"
                                        checked={formData.cbfc === "U"}
                                        onChange={handleChange} />
                                    <Form.Check
                                        inline
                                        label="A"
                                        type="radio"
                                        name="cbfc"
                                        value="A"
                                        checked={formData.cbfc === "A"}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row}  >
                                <Form.Label column sm="3" >Runtime</Form.Label>
                                <Col sm="2">
                                    <Form.Control
                                        type="number"
                                        min='0'
                                        max='12'
                                        name="runtimehr"
                                        placeholder="hr"
                                        value={runtimehr}
                                        onChange={handleHoursChange} />
                                </Col>
                                <Col sm="2">
                                    <Form.Control
                                        type="number"
                                        min='0'
                                        max='60'
                                        name="runtimemin"
                                        placeholder="min"
                                        value={runtimemin}
                                        onChange={handleMinutesChange} />
                                </Col>
                                <Col sm="2">
                                    <h4>=</h4>
                                </Col>
                                <Col sm="3">
                                    <Form.Control
                                        required
                                        type="number"
                                        min='0'
                                        name="runtime"
                                        placeholder="Runtime"
                                        value={formData.runtime}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" >Rating</Form.Label>
                                <Col sm="3">
                                    <Form.Control
                                        required
                                        type="number"
                                        name="rating"
                                        step='0.1'
                                        min='0.0'
                                        max='10.0'
                                        placeholder="0.0"
                                        value={formData.rating}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} >
                                <Form.Label column sm="3" >OTT Id</Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        required
                                        type="text"
                                        name="ott_id"
                                        placeholder="OTT Id"
                                        value={formData.ott_id}
                                        onChange={handleChange} />
                                </Col>
                            </Form.Group>
                            <br />
                            {/* {finalFormData && <p>{finalFormData.ott_id}</p>} */}
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">Languages </Form.Label>
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
                                    <Form.Check
                                        inline
                                        label="All"
                                        type="checkbox"
                                        name="allLanguages"
                                        checked={formData.languages.length === constants.allLanguages.length}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className="col-sm-2 d-flex flex-column justify-content-center align-items-center" >
                            <div className='w-100 mb-2'>
                                <div className="row justify-content-center">
                                    <Button style={{ width: "80%", marginBottom: "10px" }} variant="warning" type="reset" onClick={handleReset}>
                                        Reset
                                    </Button>
                                </div>

                                <div className="row justify-content-center">
                                    <Button style={{ width: "80%", marginBottom: "10px" }} variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-5  d-flex flex-column justify-content-center align-items-center" >
                            <textarea
                                ref={textareaRef}
                                style={{
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    overflowY: "hidden",
                                    minHeight: "50px"
                                }}
                                readOnly
                                value={JSON.stringify(finalFormData, movieFormService.replacer, 4)}
                                onFocus={handleTextareaFocus}
                            ></textarea>
                        </div>
                    </div>
                </Form>
            </Container>

        </div>
    );
}

export default MovieForm;