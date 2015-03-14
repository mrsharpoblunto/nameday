#Nameday

A simple web app to help people choose a name that everyone agrees on (primary usecase: upcoming children, though I'm sure it could be useful in other situations too). The web app allows each registered user to go through a list of names and either accept or reject the name. At any time, users can then check to see which names that all users have agreed upon. 

## Configuration & Requirements

Thei web app is built using Node.js and the current user shortlist is stored using MongoDB, so you will need both of these installed on the machine being used to host the web app.

Users: The list of users is defined in data/users.js - simply add or remove users to the JSON list as required

Names: The list of names is defined in data/names.js - The default list includes a list of the most popular girls names from the last US census, but could be changed to anything you want to source name candidates from.

## Usage

Run ```npm install``` and then start the web app server with ```node index.js```

## License

Nameday is licensed under the [MIT license](https://github.com/mrsharpoblunto/nameday/blob/master/LICENSE).

