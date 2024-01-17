## 🚀 Deployed web service link

 **Paste this link on your browser**:  Wait for 10 secs, as free instances will spin down due to inactivity
 
    https://chat-app-ky2m.onrender.com
## 🚀 Project Setup
To get started with locally running the app, follow these simple steps:

1. **Clone this repository**: Begin by cloning the Miro Notes App repository to your local machine using the following command:
    ```bash
    https://github.com/surya-nand/miro-notes-app.git
    ```
2. **Install the dependencies**: Navigate to the cloned repository and install the required dependencies by running the following command:
    ```bash
    npm install --force
    ```
3. **Create a `.env` file**: Create a `.env` file in the root directory of your project and add the following environment variables:
    ```env
    SECRET_KEY = <your_secret_key>
    PORT=5000
    MONGO_SERVER= mongodb+srv://18131a0176:mongo123@cluster0.4chdkwu.mongodb.net/
    ``` 
    > **Hosted on the internet**: `mongodb+srv://<username>:<password>@somecluster.some.mongodb.net/`
4. **To run this program locally**: Naviagate to server folder
    ```bash
    cd server
    Run nodemon index.js
    ```
## 🚀 Project Approach
I have used express(Node.js Framework) to build this server

1. **Defining routes**: Begin by 
    ```bash
   1. Creating three seperate files to handle user routes,message rotes,chat routes
   2. User Routes to handle login,signup,editUser,fetchUser 
   3. Messages Routes to handle fetchMessage, addMessage, fetchReactions, updateReactions
   4. Chat routes to navigate fetchChats, CRUD operations
    ```
2. **Middleware**: Using JWT authentication 
    ```bash
    1. Creating protected routes by verifying token before accessing the controllers
    2. Admin route to verify the role of the user
    ```
3. **Controllers**: Created userContoller and chatController, notesController
    ```bash
    1. User controller - handles registerUser and loginUser
    2. Chat controller - handles CRUD operation performed on chats
    ``` 
    
4. **Model**: Created user,message model, chat model
    ```bash
    1. user schema - Consists of user records
    2. chat schema - Consists of chat records
    3. message schema - consists of message records
    ```
5. **MongoDB**: 
    ```bash
    1. used mongoose to connect with mongoDB database
    ```
6. **Testing**: 
    ```bash
    1. Manually tested each middleware,routes and controllers using postman
    ```
## 🚀 Further Development

1. **Connecting web socket**: 
    ```bash
   1. connecting web socket to push real time message notifications
   2. Real time update of messages
    ```
2. **Admin**: 
    ```bash
    1. Admins can see which group an user belongs and edit them from dashboard
    ```
3. **Reactions animation**: upgrading from basic reactions to animate reactions 
    ```bash
    1. On hovering on reaction a users can see which users have reacted to which message and type of reaction
    ``` 
    
4. **Further UI Development**: 
    ```bash
    1. Further UI interface developments to make app more user friendly and responsive
    ```
    ``` 
