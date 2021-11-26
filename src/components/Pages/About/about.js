import React from "react";

function About() {
    return (
        <div className="about">
            <h1 className="title">About</h1>
            <p>This is a React based quotes network Application! <br />
                Using the application you can look at and share random or popular Quotes and see their ratings.
                If you create an account or log in you can also rate quotes yourself and look at the Quotes you rated.
            </p>
            <p>
                The application is built using React, Firebase, the Material UI library, the <a href="http://quotes.stormconsultancy.co.uk/api"><b>Stormconsultancy Quotes API</b></a>.
                The application is fully responsive, routed and uses React lazy loading for dynamic loading of components.
            </p>
            <p>
                Made by <a href="https://jwvbremen.nl/" target="_blank" rel="noreferrer"><b>Jan-Willem van Bremen</b></a> - 2021
            </p>
        </div>
    )
}

export default About;
