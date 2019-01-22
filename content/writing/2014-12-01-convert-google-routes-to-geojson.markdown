---
  title:  "Convert Google Maps Directions to geoJSON with Node"
  permalink: /gmaps-to-geojson/
  date:   2014-12-01 12:30:00
  category: writing
  description: I'm working on building some maps to record the routes we took on our cross country road trip. In order to accomplish this, I needed geoJSON data of all the roads we drove, so I used Node and Google Maps to build the data pretty easily.
---

When my wife and I gave up a permanent home in early 2013 to live nomadically for a while (which we did until September of this year), one of our goals was to keep a blog on the trip of all the things we did, the sights we saw, the roads we traveled.

We were very unsuccessful in that goal. So now that we've settled down I've made  it a personal goal to build a site to record the trip in hindsight. We didn't fulfill the goal as we traveled, but we can do it now!

With that in mind, yesterday I sat down at my computer to start working through [this tutorial](http://bost.ocks.org/mike/map/) to make some maps of the routes we undertook on our trip using D3.js. A few paragraphs into the tutorial, it became clear that I needed some geoJSON to work with. I ended up spending the day building the geoJSON files of all our routes, and I thought I'd document the file I ended up with that takes a list of cities and turns them into a geoJSON dataset of road paths.

### geoJSON & Google Maps

[GeoJSON](http://geojson.org/) is a format that helpfully allows you to encode geographic data as JSON, which can then be used in a variety of means. There are quite a few tools that will help you export an annotated map as geoJSON and such, but I spent awhile searching for a way to take a driving route and turn it into a geoJSON, and I couldn't find it. Thankfully, there were a few node packages that helped me out.

The format is pretty standard, but it's not used by Google Maps. I potentially could have used other mapping tools to get the road routes, but the Google Maps API is pretty convenient to use, so I decided to go with the path of least resistance.

### Getting Started

To achieve my goal, I relied on 3 node modules:

- [googlemaps](https://www.npmjs.org/package/google-maps): a handy Node wrapper for the GMaps API
- [polyline](https://www.npmjs.org/package/polyline): a tool to decode GMaps polyline data into an array of Lat/Lng data made by Mapbox
- [geojson](https://www.npmjs.org/package/geojson): which takes regular JSON and converts it into geoJSON

I also used the [es6-promise](https://www.npmjs.org/package/es6-promise) package because I love Promises when dealing with async code.

The final script is [on Github](https://github.com/wnstn/roadtripData/blob/master/getRoute.js) but I'll walk through the components individually here. Shout out to [this post](http://zevross.com/blog/2014/09/23/convert-google-directions-to-geojson-points-or-polylines/) which helped point me in the right direction.

### Step 1: Get the Google maps Route

Here's the code:

{{< highlight javascript >}}
googlemaps.config({'key': apiKey});

function getGoogleRouteInformation(origin, destination, waypoints) {
    return new Promise(function(resolve, reject){
        if (!origin || !destination) {
            util.error('Origin and destination required!')
        }

        function handleResponse(err, data) {
            if (data.status == "OK") {
                resolve(data);
            } else {
                reject('There was a problem getting the data from Google: ', err);
            }
        };
        googlemaps.directions(origin, destination, handleResponse, false, false, waypoints);
    });
}
{{< / highlight >}}

The first thing you'll notice is that I'm passing in an apiKey, you can get yours [from Google](https://code.google.com/apis/console/?noredirect). Next, I'm creating a function to get the route information from Google, which takes 3 arguments: `origin`, `destination`, and `waypoints`. `Origin` and `Destination` are required, thus the if statement that logs an error if they are missing.

The `getGoogleRouteInformation()` returns a Promise, which allows me to string together all the steps into a very neat, human readable format. If you don't know much about Promises, I collected a list of [great reading material]({% post_url 2014-09-19-javascript-promises-links %}) that can help you get up to speed. In this script, I'm using the Promises `thenable` functionality to pass the data along, which you'll see in the next section.

After confirming the required arguments are present, I build a small function to resolve or reject the promise once the data is loaded, so that I can have a little help in debugging if things go awry.

The last line of the function is the actual call to Google, and it uses the `googlemaps` node module, which itself has a slightly confusing API. If you dig into the module, you'll see that `directions()` takes an argument for each possible attribute of  the [Google Directions API](https://developers.google.com/maps/documentation/directions/?csw=1), but the documentation doesn't make it clear how to format the args. After a bit of playing around and Googling, I was able to get things correctly. Just so you know, the function call for `directions()` looks like this in the Module:

{{< highlight javascript >}}
exports.directions = function(origin, destination, callback, sensor, mode, waypoints, alternatives, avoid, units, language, departureTime, arrivalTime, region)
{{< / highlight >}}

And each argument is just expecting a preformatted string. For the waypoints, a single string is passed in with each waypoint separated by a pipe: `Nashville, TN|Dallas, TX|Amarillo, TX`.

### Step 2: Error Handling

I've been working on Ember apps with one company for a few months now and I learned from a coworker recently that sometimes when dealing with Promises you'll get silent failures if you aren't always catching errors. Because of that, I wanted to make sure I was aware of anything that went wrong in our chain. A promise's `.then()` function takes two arguments, the first a success handler, the second an error handler. So `handleError()` is a compact function to be passed into every `then()` in case something goes wrong.

{{< highlight javascript >}}
function handleError(err) {
  util.error(err);
};
{{< / highlight >}}

### Step 3: Decode Google Polyline Data

After calling `getGoogleRouteInformation()`, I can start building out the chain that will process the resulting data.

{{< highlight javascript >}}
.then(function(data){
  var encodedPolyline = data.routes[0].overview_polyline,
      decodedPolyline;

  decodedPolyline = polyline.decode(encodedPolyline.points);

  return decodedPolyline;

}, handleError)
{{< / highlight >}}

Google Maps returns a large JSON object with all the necessary information for displaying a map on a page, but for my purpose, I only care about the `overview_polyline` object in the JSON. This is an encoded polyline object that represents the road route - the blue line you're used to seeing if you've ever looked up driving directions on Google Maps.

`Polyline` is a small tool by Mapbox that decodes the polyline data and returns an array of arrays, with each child array containing a latitude and longitude point. This array is what I'll manipulate next.

### Step 4: Normalize the decoded Polyline Data

Before I can take the geo data and convert it to geoJSON, it needs to be standardized into an object that the `geojson` object can understand. To do that, I just loop through the arrays, build a new object, and push that object into a new array.

{{< highlight javascript >}}
.then(function(points){
  var normalized = [];

  points.forEach(function(rawPoints){

    var value = {
      'lat': rawPoints[0],
      'lng': rawPoints[1]
    };

    return normalized.push(value);

  });

  return normalized;

}, handleError)
{{< / highlight >}}

The decoded polyline data is an array where the first value is the latitudinal point, and the second is the longitudintal point. `Geojson` expects an object with standardized keys, so I create that inside this loop. After looping through all the data, I can return the new array of objects.

### Step 5: Create the geoJSON

`Geojson` is an elegant module that exposes one function: `parse()`. I use it to take our new array and convert it to a geoJSON object like so:

{{< highlight javascript >}}
.then(function(normalizedPoints){

  var geoData = geojson.parse(normalizedPoints, {Point: ['lat', 'lng']});

  return geoData;

}, handleError)
{{< / highlight >}}

Here, `normalizedPoints`, the array of objects, is passed to `parse()` with the instructions to create each Point from the keys `lat` and `lng`. The variable `geoData` is the data I'm after.

### Step 6: Write to a file

Node has a core api called `FS` that allows you to work with the FileSystem. This last step uses it to write out the `geoData` file so I can store it in a repo. This step was made easier by [this post](http://stackoverflow.com/questions/5670752/write-pretty-json-to-file-using-node-js) on Stackoverflow.

{{< highlight javascript >}}
.then(function(geoData){

  fs.writeFile('geojson/' + output + '.geojson', JSON.stringify(geoData, null, 2));

  util.puts('Successfully created file ' + output)

}, handleError)
.catch(handleError);
{{< / highlight >}}

`output` is a variable set at the top of the file, and it is used to define the filename. The data is written out using `JSON.stringify()` so that I get the actual object data, and not just `[Object object]`. If everything goes according to plan, Node will print a success message, otherwise `.catch()` will handle the error.

### w00t.

So there you have it. The full script is [on Github](https://github.com/wnstn/roadtripData/blob/master/getRoute.js) in my data repo for now, I may spin it off into a standalone repo if I need to. Thanks to Javascript promises, we can pass the data along quite easily and the end result will great to use with D3 visualizations. If you store your geoJSON on Github, there's a handy built-in [geoJSON visualizer](https://github.com/wnstn/roadtripData/blob/master/geojson/leg01Geo.geojson) to make your files a little more useful even in the repo.

I also found it very helpful to test the geoJSON output with [this viewer](http://geojson.io) while I was debugging the Google Maps Waypoints, a simple copy/paste showed the points on a map so I could see if my route was correct.

Hopefully this article was helpful, please let me know if you have feedback, optimizations, or alternatives that I should have considered!
