                                                              Pagination Using Movies List Application
Features

The System'

•	The system displays a list of movies in a table format.
•	It includes pagination to navigate through different pages of movie data.
•	The system handles scenarios where no data is available and displays appropriate messages.

Common Features for All Users

•	Table Display: The system uses a table to present movie details such as ID, Title, Release Year, Actors, Director, Genre, and Rating.
•	Styling: The table is styled using CSS for better visual presentation.
•	Pagination: The system provides pagination controls to navigate between different pages of movie data.

Pagination Features

•	Previous Button: Displays a 'Previous' button if the current page is greater than 1, allowing users to navigate to the previous page.
•	Page Numbers: Displays clickable page numbers for easy navigation between pages.
•	Next Button: Displays a 'Next' button if the current page is less than the total number of pages, allowing users to navigate to the next page.
•	No Data Message: Displays a message indicating no data is available if the current page has no movie entries.

Data Handling

•	Dynamic Content Rendering: The system uses EJS templating to dynamically render movie data and pagination controls based on the provided data.
•	Alert for Invalid Pages: If the user navigates to a page number greater than the total pages available, an alert is displayed, and the user is redirected back to the last available page.

Technologies Used

•	HTML
•	CSS
•	SQL
•	ExpressJS
•	NodeJS
•	PRISMA
•	EJS
