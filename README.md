# Fighting COVID-19 using blockchain

We are finding ways to fight the novel coronavirus using blockchain. The project is still under developement.

This app uses IBM Bluemix services to run.
Find the endpoint here: [https://covid-19.eu-gb.cf.appdomain.cloud/](https://covid-19.eu-gb.cf.appdomain.cloud/app)

## Objective
RespirCov is a blockchain-powered application to provide a live, interactive dashboard for monitoring ventilator availability in an area. It shows hospital-wise numbers for vacant and occupied ventilators enabling the doctors, healthcare activists, patients, and other stakeholders to check the status in real-time.

## Background
There are many cases where patients do not get life support in the critical hours or are returned from the hospital due to the unavailability of ventilators. At those times, the patients need to be moved to some other hospital where the services are available. In places where there is a large outbreak, patients are refused to be admitted by multiple hospitals, often causing deaths. It is happening in New Delhi, where I live. These deaths could have been avoided if the patient had gone to the right hospital at the right time. RespirCov aims to address this issue. It lays out a map on the user’s device where anybody can get location-wise latest data of the nearest hospital to their current location.

## Parts of the project
The app is built on the blockchain. We have used IBM Cloud Foundry on a NodeJS instance to deploy it. It displays the latest figures of vacant and occupied ventilators in hospitals laid down on a map. People can find hospitals near their location and get the figures. It also provides the state authorities to direct supplies to areas and hospitals which need the most. Since it is plotted on a map, users can easily travel to that place without much effort.
Plus, using IBM App ID, we enable hospitals to register and update their status themselves in real-time. It is a very simple process that takes less than 40 seconds to register and update their count. This significantly increases the amount of accuracy in the data.

## Current standing
At present, the app holds data only for the 46 hospitals in the national capital region of India, updated twice daily.

## Future Prospects
We plan to team up with more hospitals to expand the coverage and provide figures for a wider area. We also plan to enable functionality to get real-time insights into how many people are querying an area to divert critical resources to the most needed zones as soon as possible.

## Installation and running the app locally

1. [Install Node.js][]
1. cd into this project's root directory
1. Run `npm install` to install the app's dependencies
1. Run `npm start` to start the app
1. Access the running app in a browser at <http://localhost:6001>

[Install Node.js]: https://nodejs.org/en/download/

&copy; 2020 Ayush Anand