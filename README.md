# Bacterial Biodiversity

In this assignment, I Used Plotly.js, Flask, SQLAlchemy, Bootstrap, and Heroku to build an interactive web dashboard using the [Skin Bacteria Biodiversity DataSet](http://robdunnlab.com/projects/belly-button-biodiversity/).  This project features: 
* A PIE chart which uses data from samples routes (`/samples/<sample>`) to display the top 10 samples.
* A Bubble Chart which uses uses data from your samples route (`/samples/<sample>`) to display each sample.
* Sample metadata is displayed from the route `/metadata/<sample>`.
* Each key/value pair from the metadata JSON object is displayed in a text panel.
* All plots are updated any time that a new sample is selected.
* Flask app was deployed to Heroku.

Link to my Heroku App: [Bacterial Biodiversity](https://bacterialbiodiversity.herokuapp.com/)

![Heroku Screenshot](https://raw.githubusercontent.com/robeaseab/bacterialbiodiversity/master/Screenshot_2019-06-24%20Biodiversity%20Dashboard.png)
