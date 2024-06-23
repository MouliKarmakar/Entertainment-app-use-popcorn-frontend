# Entertainment-app-use-popcorn-frontend

A. Features::

1. User Authentication: Sign up and log in functionality to save user preferences.
2. Movie Search: Search for movies using the OMDB API.
3. Watch List: Add and manage movies in your watch list.
4. Responsive Design: Responsive UI for seamless experience on different devices.

B. Technologies Used::

1. React: Frontend library for building user interfaces.
2. React Router: For routing and navigation within the app.
3. Axios: For making HTTP requests.
4. Ant Design: For UI components.
5. Lodash.debounce: For debouncing input fields.

C. Project Structure::

src/
│
├── App.js # Main entry point of the app
├── HomePage.js # Home page component
├── LoginPage.js # Login/Signup page component
├── Components/
│ ├── Navbar.js # Navigation bar component
│ ├── SearchBox.js # Search box component
│ ├── Logo.js # Logo component
│ ├── NumberOfResult.js # Component to display number of search results
│ ├── MainBody.js # Main body layout component
│ ├── ListBox.js # Component to display list of movies
│ ├── WatchedMovie.js # Component to display watched movies
└── index.js # Entry point for React

D. Usage::

D1. Sign Up / Log In:

1. Navigate to the main page.
2. Enter your email and password.
3. Click on "Sign Up" to create a new account or "Login" to log into an existing account.

D2. Search for Movies:

1. Use the search box on the home page to search for movies.
2. Results will be displayed as you type.

D3. Manage Watch List:

1. Add movies to your watch list by selecting them.
2. Remove movies from your watch list using the delete functionality.

E. API Endpoints::

1. Sign Up: POST https://entertainment-app-use-popcorn-backend.onrender.com/signup
2. Log In: POST https://entertainment-app-use-popcorn-backend.onrender.com/
3. Get Watched Movies: GET https://entertainment-app-use-popcorn-backend.onrender.com/watched
4. Add to Watch List: POST https://entertainment-app-use-popcorn-backend.onrender.com/watched
5. Delete from Watch List: DELETE https://entertainment-app-use-popcorn-backend.onrender.com/watched

F. License::

This project is licensed under the MIT License.
