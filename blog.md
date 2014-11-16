##Making an RSS reader using orchestrate and nodejs

Firstly, make an account at orchestrate.io, then make an application, then make two collections inside that application:

* feeds
* toRead

Then, go back to your dashboard and grab your application's API key. Put it in your first line of code like so:

				var db = require("orchestrate")(NUMBERS-API-KEY);

In terminal, install the ochestrate module using npm (be sure you are in the project's directory)

				npm install orchestrate

Now seed the orchestrate database with some information.

TODO:::::

Populate toRead database with entries
use npm's fs to write a json file with entries from db query
read that json on the web page, use jquery to construct the page
