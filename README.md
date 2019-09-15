Setup
- Install npm

- React frontend:
    * Go to frontend folder
    * Run: npm install
    * Run: json-server ./src/data/db.json --watch --port 4081
    * Run: npm run serve


Development
- React frontend: http://localhost:8081
- Json server: http://localhost:4081


Usage
Assume index page will redirect to login page automatically.
Assume requesting API will be half of second.

- Go to http://localhost:8081 to login.
- Use 'test@gmail.com/123' to login OR open ./src/data/db.json file to pick up another user.
- Enter email and password which are required.
- Email must be valid and exist on db.json.
- Click on Login button:
    * Success: Message box will show the info of user.
    * Error: Alert will show.
- Click on Close or X button to close the message box.

- Click on 'Want to reset password' link to redirect to reset password page.
- Enter email, new password and confirm password which are required.
- Email must be valid and exist on db.json.
- New password and confirm password must be the same.
- Click on Save button:
    * Success: Message box will show.
    * Error: Alert will show.
- Click on Close or X button to close the message box.
