#Practical Test APP

Welcome to my Practical Test APP! This app allows you to log in using your email and password, view a list of users, and perform various actions based on your role. Here are some details about the app:

##How to Access the App

To access the app, simply go to the following link:

##User Credentials

The app uses a file called users.JSON to store user credentials. The file contains user information, including email, password, and role. There is one admin user and several regular users.

Admin Credentials:

Email: sara@example.com
Password: Sara@123
Role: admin

Regular User Credentials:

Email: jim@example.com
Password: Jim@1234
Role: user

##Logging In

Navigate to the login page on the app.
Enter your email and password.
If the entered email or password does not match the validation criteria, a notification error will be shown.
If the email and password match the validation criteria but the user is not found in the users.JSON file, an error message will be displayed.
If the credentials are valid and the user is found in the file, you will be logged in successfully, and the app will redirect you to the users page.

##Users Page

On the users page, you will see a list of users fetched from the users.JSON file. If you logged in using the admin credentials, you will have the option to update the users by clicking the edit button next to each user. Regular users will not see the edit button.

##Updating Users

If you are logged in as an admin, you can click the edit button next to a user to update their information.
When you update a user, a notification will be shown indicating that the user has been successfully updated. However, please note that this is a front-end notification only, and the updates are not saved to the users.JSON file in the backend.

##Unauthorized Access

If you try to navigate back to the login page after successfully logging in, you will not be allowed. The app will redirect you to the users page as you are already authenticated.
If you attempt to access the users page without logging in successfully, you will be redirected to the login page to authenticate.

##Filtering Users

The users page provides inputs for filtering the user list. As you type in any input, the table will trigger the filter function, and the list will be updated in real-time based on the entered filter criteria.

##Sorting Users

The users table is sortable by clicking on the title of any column. Clicking on a column title will sort the users in ascending order based on that column. Clicking the same column title again will sort the users in descending order.

##Logout

You can log out of the app by clicking the logout button on the users page. After logging out, you will be redirected to the login page.

Enjoy using my React app! If you encounter any issues or have any feedback, feel free to reach out to me. Happy exploring! 😄
