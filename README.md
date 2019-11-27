# Dandy

**NOTE**: Make sure *python3* and *pip3* is installed.

## Setup

### 1. AngularJS Frontend:

In the **/frontend** folder:

    `python -m http.server &`

This will serve this folder up in a local web server, which can be accessed from *localhost:8000*

### 2. Python/Flask Backend:

In the **/backend** folder:

1. Start a virtual envirtonment

    `python3 -m venv ./venv`

2. Activate the environment 

    `source ./venv/bin/activate`

3. Install al dependencies

    `pip3 install -r requirements.txt`

4. Export flask app

    `export FLASK_APP=app.py`

5. Initialize and migrate database

    - `flask db init`
    - `flask db migrate`
    - `flask db upgrade`

6. Run flask app

    `flask run`

The backend should now be running at *localhost:5000*

### 3. Populate database:

In the web browser, go to:

    `localhost:5000/sync`

This will populate the database will all the dog breeds, so that autocomplete will work as the user fills out the survey— the response should be **SUCCESS**

## Try it out

- `localhost:8000/`: AngularJS app 
- `localhost:5000/`: Backend

### Add any and all doggos:
Now that both frontend and backend are running in their own local server, navigate to 

    `localhost:8000/`

This should direct you to the first page of the dandy survey page, where it will ask you of the *dog name*

Follow and use the app as directed :) Go ahead and add as many dogs as you'd like.

### (Finally) Check database to verify:

Navigate to 

    `localhost:5000/dogs`

This will show you all the dogs in the database that were added through the Dandy survey.


