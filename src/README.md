# Running and Testing
To run and test this endpoint, simply run `make` after this, the endpoint should be
exposed at`localhost:5000/api/robots/closest`. This can be tested with postman by passing in the payload as described in
the requirements document. 

Some examples:
```json
{
    "loadId": 231, 
    "x": 5, 
    "y": 3
}
```
```json
{
    "loadId": 20, 
    "x": 15, 
    "y": 8
}
```
```json
{
    "loadId": 67, 
    "x": 48,
    "y": 43
}
```

Any request made to a route outside of localhost:5000/api/robots/closest should return the following
```json
{
  "message": "Not found"
}
```
with a `400` status code.

# What's next
The first thing I would do at this point is to abstract the endpoint into multiple different functions rather than leave
it as one large handler. After this and ensuring proper documentation on this endpoint as well as on the internal 
functions, I would begin to start implementing additional features. 

## Additional Features
I would implement features such as the ability to 
configure the range at which multiple robots must be in before considering battery life (i.e. 15 units instead of 10).
Passing in an optional member in the request body would allow for easy implementation and use of this feature.

Another possible feature addition would be the option to have multiple different robots returned rather than a single. 
This would likely be best implemented with a second endpoint but could also be implemented using the same end point checking 
for an additional but optional parameter in the request body. 
This would allow for a selection of the most qualified robots returned in order from most qualified to least (i.e. get best 5 instead of the single best robot).

It would also be beneficial to improve the filtering parameters, so it is not just based on distance and battery life.
Adding in checks to see if the robot is currently busy or not and estimate how much time it will have until it is available again
would be useful to ensure the best and fastest possible robot is chosen for the task. This would likely be better implemented
as an additional endpoint however to allow for users to get the closest as is now, but also the closest available.