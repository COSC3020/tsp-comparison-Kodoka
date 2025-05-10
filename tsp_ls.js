function tsp_ls(distance_matrix)
{
    // If theres less than 2 cities, the shortest length is 0.
    if(distance_matrix.length < 2)
    {
        return 0;
    }

    var msToSearch = 50;
    var startTime = Date.now();
    // Default route is indices of dimensions of input distance_matrix.
    var route = [...Array(distance_matrix.length).keys()];
    // Shortest length defaults to default route's length.
    var shortestLength = routeLength(route, distance_matrix);
    var indices = randomizeIndices(distance_matrix.length, null);

    // Keep looking for shorter routes, 'til a shorter route hasn't been found
    // in some time.
    while(Date.now() - startTime < msToSearch)
    {
        var candidateRoute = reverseRouteSegment(route, indices);
        var candidateLength = routeLength(candidateRoute, distance_matrix);

        // If the new candidate route provides a better length, shorter,
        // replace the old route and length.
        if(candidateLength < shortestLength)
        {
            route = candidateRoute;
            shortestLength = candidateLength;
        }

        indices = randomizeIndices(distance_matrix.length, indices);
    }

    return shortestLength;
}

// Provides the length of a proposed route, using a distance matrix.
function routeLength(route, distance_matrix)
{
    var routeLength = 0;

    // For each element in the route, add the distance between the
    // current city, and the next to the routeLength.
    for(var routeIndex = 0; routeIndex < route.length - 1; routeIndex++)
    {
        routeLength += distance_matrix[route[routeIndex]][route[routeIndex + 1]];
    }

    return routeLength;
}

// Reverse the order of cities within a segment of a route.
function reverseRouteSegment(route, indices)
{
    // Saves the route preceeding firstIndex.
    var start = route.slice(0, indices[0]);
    // Reverses the route from fistIndex through secondIndex.
    var middle = route.slice(indices[0], indices[1] + 1).reverse();
    // Saves the route follownig secondIndex.
    var end = route.slice(indices[1] + 1);

    // Returns the new route.
    return start.concat(middle, end);
}

// Provides new indices to be used when reversing a route segment.
function randomizeIndices(numCities, previousIndices)
{
    if(numCities <= 2)
    {
        return[0, 1];
    }
    var newFirst;
    var newSecond;

    // At least once randomly generate new indices to swap. If the two new indices
    // are the both the same as the old, randomize until they're not.
    do
    {
        // The newFirst index can be any index between 0, and 1 less than the
        // number of cities.
        newFirst = Math.floor(Math.random() * (numCities - 1));
        // The newSecond index can be any index between newFirst + 1, and the
        // number of cities.
        newSecond = Math.floor((Math.random() * (numCities - newFirst - 1)) + newFirst + 1);
    } while(previousIndices && previousIndices[0] == newFirst && previousIndices[1] == newSecond)

    // Return the indices that will be swapped next.
    return [newFirst, newSecond];
}

module.exports = { tsp_ls };