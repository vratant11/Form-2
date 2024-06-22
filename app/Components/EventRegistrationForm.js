// components/EventRegistrationForm.js
'use client';
// components/EventRegistrationForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './EventRegistrationForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faBriefcase, faCode, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const EventRegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        skills: [],
        interviewTime: null
    });

    const [errors, setErrors] = useState({});

    const skillOptions = ["JavaScript", "CSS", "Python", "React", "Node.js"];

    const validate = () => {
        const errors = {};
        if (!formData.fullName) errors.fullName = 'Full Name is required';
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }
        if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required';
        if (!formData.position) errors.position = 'Applying for Position is required';
        
        // Conditionally validate fields based on position
        if (formData.position === 'Developer' || formData.position === 'Designer') {
            if (!formData.relevantExperience) errors.relevantExperience = 'Relevant Experience is required';
        }
        if (formData.position === 'Designer') {
            if (!formData.portfolioUrl) errors.portfolioUrl = 'Portfolio URL is required';
        }
        if (formData.position === 'Manager') {
            if (!formData.managementExperience) errors.managementExperience = 'Management Experience is required';
        }
        
        if (formData.skills.length === 0) errors.skills = 'At least one skill is required';
        if (!formData.interviewTime) errors.interviewTime = 'Preferred Interview Time is required';
        
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            alert(JSON.stringify(formData, null, 2));
        } else {
            setErrors(errors);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (checked) {
                setFormData(prevState => ({ ...prevState, skills: [...prevState.skills, value] }));
            } else {
                setFormData(prevState => ({ ...prevState, skills: prevState.skills.filter(skill => skill !== value) }));
            }
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleDateChange = (date) => {
        setFormData(prevState => ({ ...prevState, interviewTime: date }));
        setErrors(prevErrors => ({ ...prevErrors, interviewTime: '' }));
    };

    // Render additional fields based on selected position
    const renderAdditionalFields = () => {
        switch (formData.position) {
            case 'Developer':
                return (
                    <div className={styles.formGroup}>
                        <label>Relevant Experience (Number of years):</label>
                        <input
                            type="text"
                            name="relevantExperience"
                            value={formData.relevantExperience}
                            onChange={handleChange}
                        />
                        {errors.relevantExperience && <span className={styles.error}>{errors.relevantExperience}</span>}
                    </div>
                );
            case 'Designer':
                return (
                    <>
                        <div className={styles.formGroup}>
                            <label>Relevant Experience (Number of years):</label>
                            <input
                                type="text"
                                name="relevantExperience"
                                value={formData.relevantExperience}
                                onChange={handleChange}
                            />
                            {errors.relevantExperience && <span className={styles.error}>{errors.relevantExperience}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label>Portfolio URL:</label>
                            <input
                                type="text"
                                name="portfolioUrl"
                                value={formData.portfolioUrl}
                                onChange={handleChange}
                            />
                            {errors.portfolioUrl && <span className={styles.error}>{errors.portfolioUrl}</span>}
                        </div>
                    </>
                );
            case 'Manager':
                return (
                    <div className={styles.formGroup}>
                        <label>Management Experience:</label>
                        <textarea
                            name="managementExperience"
                            value={formData.managementExperience}
                            onChange={handleChange}
                        ></textarea>
                        {errors.managementExperience && <span className={styles.error}>{errors.managementExperience}</span>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faUser} className={styles.icon} /> Full Name:
                    </label>
                    <input 
                        type="text" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                    />
                    {errors.fullName && <span className={styles.error}>{errors.fullName}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> Email:
                    </label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faPhone} className={styles.icon} /> Phone Number:
                    </label>
                    <input 
                        type="text" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange} 
                    />
                    {errors.phoneNumber && <span className={styles.error}>{errors.phoneNumber}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faBriefcase} className={styles.icon} /> Applying for Position:
                    </label>
                    <select 
                        name="position" 
                        value={formData.position} 
                        onChange={handleChange}
                    >
                        <option value="">Select a position</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                        <option value="Manager">Manager</option>
                    </select>
                    {errors.position && <span className={styles.error}>{errors.position}</span>}
                </div>

                {/* Render additional fields based on selected position */}
                {renderAdditionalFields()}

                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faCode} className={styles.icon} /> Additional Skills:
                    </label>
                    <div className={styles.checkboxGroup}>
                        {skillOptions.map(skill => (
                            <label key={skill} className={styles.checkboxLabel}>
                                <input 
                                    type="checkbox" 
                                    name="skills" 
                                    value={skill} 
                                    checked={formData.skills.includes(skill)}
                                    onChange={handleChange}
                                />
                                {skill}
                            </label>
                        ))}
                    </div>
                    {errors.skills && <span className={styles.error}>{errors.skills}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label>
                        <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} /> Preferred Interview Time:
                    </label>
                    <DatePicker 
                        selected={formData.interviewTime} 
                        onChange={handleDateChange} 
                        showTimeSelect 
                        dateFormat="dd/MM/yyyy, h:mm aa"
                        placeholderText="dd/mm/yyyy, --:-- --"
                        className={styles.datePicker}
                    />
                    {errors.interviewTime && <span className={styles.error}>{errors.interviewTime}</span>}
                </div>
                <button className={styles.submitButton} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EventRegistrationForm;
