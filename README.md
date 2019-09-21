Simple login without authentication  
&nbsp;  
Setup:
- Install npm   
- React frontend:
    * Go to frontend folder
    * Open new cmd and run: npm install
    * Open new cmd and run: npm run mock:api
    * Open new cmd and run: npm run serve

Development:
- React frontend: http://localhost:8081
- Json server: http://localhost:4081

Usage:  
Assume home page will redirect to log in page automatically.  
Assume requesting API will be half of second.  
- Go to http://localhost:8081 to log in.
- Use 'test@gmail.com/123' to log in OR open ./src/data/db.json file to pick up another user.
- Enter email and password which are required.
- Email must be valid and exist on db.json.
- Click on log in button:
    * Success: Message box will show.
    * Error: Alert will show.
- Click on Close or X button to close the message box and redirect to home page.
- After 3s, redirect to home page.  
&nbsp;  
- In home page, click on the name of user on the top right to show the dropdown menu.
- Click on log out.
- Redirect to log in page.  
&nbsp;  
- Click on 'Want to reset password' link to redirect to reset password page.
- Enter email, new password and confirm password which are required.
- Email must be valid and exist on db.json.
- New password and confirm password must be the same.
- Click on Save button:
    * Success: Message box will show.
    * Error: Alert will show.
- Click on Close or X button to close the message box and redirect to log in page.
- After 3s, redirect to log in page.  