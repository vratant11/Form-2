// pages/index.js or wherever your form is being used
import React from 'react';
import EventRegistrationForm from './Components/EventRegistrationForm';
import styles from './Components/EventRegistrationForm.module.css'


const Home = () => {
    return (
        <div className={styles.pageWrapper}>
            <EventRegistrationForm/>
        </div>
    );
};

export default Home;
