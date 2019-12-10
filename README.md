# helper
A personal helper application to make dev work a bit more smooth.
## How to Use
```bash
git clone https://github.com/torinberger/helper.git
```
Clone onto your remote/local server.
```bash
cd helper && node index.js
```
The helper will now start and be accesible from `localhost:3000/` where localhost is the ip of the server or just localhost for your local server.
## Adding Projects
In the `helper/` directory you just cloned, create or edit a file called `targets.json`. It is a JSON file containing an array of strings, each string being the name of a project. Heres what it could look like.
```JSON
[ "project1", "project2" ]
```
Simply add the name of your project(s) to the list. Remember, project names need to be identical to the project names passed by the helper-client, for this reason you may choose to keep project names lower case.
## Pinging the Helper with the Helper-Client
Once the helper is listening for pings from different projects, you need to let the helper know that the projects are running. So for each project you specified above, follow the instructions (here)[https://github.com/torinberger/helper-client].
