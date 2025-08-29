<a id="readme-top"></a>
<br />

<div align="center">
  <h2 align="center">Student Manangement System</h2>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

-   practice typescript, redux, zod and react hook form
    -   typescript for proper typing
    -   redux for setting up the authentication and query using the RTK
    -   zod for validation
    -   react hook form for handling the forms
-   right now it only have a attendance system
-   soon expand the project into full student management system

## Demo

[![Demo link]](https://youtu.be/jbKYT4xEpEY)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

-   ![ReactJS](https://img.shields.io/badge/REACTJS-61DAFB?style=for-the-badge&logo=react&logoColor=black)
-   ![shadcn/ui](https://img.shields.io/badge/SHADCN.UI-000000?style=for-the-badge)
-   ![React Router](https://img.shields.io/badge/REACT--ROUTER--DOM-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
-   ![Redux](https://img.shields.io/badge/REDUX-764ABC?style=for-the-badge&logo=redux&logoColor=black)
-   ![Zod](https://img.shields.io/badge/ZOD-3E67B1?style=for-the-badge&logo=zod&logoColor=black)
-   ![React_Hook_Form](https://img.shields.io/badge/REACT_HOOK_FORM-EC5990?style=for-the-badge&logo=reacthookform&logoColor=black)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

-   [x] create register page and logic
-   [x] create login page and logic
-   [x] setup redux
    -   [x] using RTK to create a query that handles inital token and use refresh token to get new access token
-   [x] logout feature
-   [x] create home ui
    -   [x] setup shadcn sidebar
    -   [x] header to display teachers name
    -   [x] attendance component that link to attendance page
        -   [x] query to display all student in attendance page
            -   [x] only display the attendance related data
            -   [x] filter data base on selected date. To be able to see if a student is present in that day (select date)
            -   [x] status combo box that able to manipulate the student attendance status
            -   [x] filter feature. Filter data using grade and section
    -   [x] student component that link to students page
        -   [x] display all student data
            -   [x] only display the absences and present days of the student
            -   [x] search feature. User able to search a specific student by name
            -   [x] dropdown menu. Edit and delete button.
            -   [x] edit student data if edit menu is click
            -   [x] delete student if delete menu is click
-   [ ] expand the project into full student management system
