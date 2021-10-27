# QA-JS-Project

QA Academy Project to create a simple HR application using HTML 5, Javascript and CSS.

# Acknowledgements

Thank you to Aswene and Morgan from QA for advising and their help sessions. 

# Features

The application opens with a small list of dummy data ready to manipulate for testing purposes.
Viewing employee data stored in an array.
Filter the employee data shown by department using a drop-down list.
Employee can be added to the list and shown in the display.
An employee can be selected and have their data edited.
An employee can be swiftly eliminated from the list.

# Getting started

Fork and then clone the repository. To view the end version, open the index.html file on your browser. To view the code, open the index.html and script.js in Visual Studio Code.

# Evaluation

This seemed simple at first but I quickly learnt that this was NOT the case. The main issue was surrounding the indexes in the tables, and this ending up affecting the edit functionality in early iterations. Initially, the edited employee would populate the whole table and replace the other employee entries. This was solved by taking out the idea of tracking indexes for each row which could get messy when adding and removing employees and editing. This was replaced with getting the row that the button was clicked belongs to, and then looping over the cells in the row and get the data. Which then allows it to be edited and saved.

In the future this project would be extended to include constraints such as making sure no employee can have the same NI Number and giving a warning message when this is attempted. 
