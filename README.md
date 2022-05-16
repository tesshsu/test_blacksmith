# test_blacksmith
A parking management system for B2B customers
Specs: The system allows public users to know which spaces are available in a car park to save navigation time! On the company side, the system allows Vinci to have an overview of its car park (occupancy rate, time of use, etc.)


We must therefore create the following RESTful API:

- Login / Register a user (admin or public role)

- Read user information

- Create a parking space (Space number / Floor / Availability / Occupancy time) by admin

- modify a parking space by who had created the parking place by admin

- Assign / Unassign a parking space to a user by admin

- Search for a free space (by floor)

- Search for a place by user (where did I park my car?)

# Installation
Here are the dependancies you need to install:

NodeJS 12.14 or 14.0.
Angular CLI 7.0.2.
node-sass : make sure to use the corresponding version to NodeJS. For Noe 14.0 for instance, you need node-sass in version 4.14+.
On Windows, these installations require to use PowerShell in administrator mode.

Then, clone this repo, run npm install, and run npm install --save-dev run-script-os.

# Usage
Run npm start. This should both run the local server and launch your browser.

If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:8080.

The app should reload automatically when you make a change to a file.

Use Ctrl+C in the terminal to stop the local server.
