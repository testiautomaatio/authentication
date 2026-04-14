# Authentication

This repository contains views for authentication and registration that are based on the Material UI examples provided at https://github.com/mui/material-ui/blob/v6.4.6/docs/data/material/getting-started/templates/.

Material UI license: https://github.com/mui/material-ui/blob/master/LICENSE


## Default usernames

The application uses local storage for persisting logins. Therefore, each registration that is made on the test site, is only stored in that specific browser instance. There are permanent default users that can be used during tests:

| Name     | Username             | Password                           |
|----------|----------------------|------------------------------------|
| Alice    | alice@example.com    | `}3jc\xJnQ=E=+Q_y/%Hd311bW#6{_Oyj` |
| Bob      | bob@example.com      | `nUL9zA3q=Nt7\N,0?CL&c74U,Ic)0)dN` |
| John Doe | john.doe@example.com | `AllTestsPass1!`                   |
| Jane Doe | jane.doe@example.com | `ItWorksOnMyMac1!`                 |

Never use these credentials anywhere else, as they are not secure. They are only meant for testing purposes on the test site.


## Test cases

The following test cases can be used to verify the functionality of the authentication and registration features of the application. Each test case should be executed in a clean browser environment (e.g., incognito mode) to ensure that local storage does not contain any previous data that could affect the results.


### Login

* The service home page must contain a login form with fields for email and password, and a login button.
    * Both username and password are required, and missing values must show an error message.
    * Login must notify if the username is in an invalid format or if the password is too short.
* A registered user must be able to sign in with email and password.
    * Login must be case-insensitive for the email field, but case-sensitive for the password field.
* After successful login, the user must be redirected to `/dashboard`, where a welcome message is shown.
* Login must prevent access with both an unknown username and an incorrect password.
* If a user tries to access `/dashboard` directly without a valid login session, they must be redirected back to the login page.
* When a logged-in user logs out using the "Logout" button, they must be redirected back to the login page.

### Registration

* Registration must be accessible both directly via `/signUp` and through the home page "Sign up" link.
* Name, email, and password are required for registration.
* A registration attempt with an already registered email must show an error message.
    * Registration is case-insensitive for the email field, so an attempt to register with an email that differs only in case from an existing email must also show an error message.
* Registration with valid data must create an account, show a success message, and redirect to the login page.
* An account created during registration must be usable for login immediately afterward (within the same browser session).

