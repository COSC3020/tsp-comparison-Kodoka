const { tsp_hk } = require('./tsp_hk.js');
const { tsp_ls } = require('./tsp_ls.js');

function generateRandomDistanceMatrix(size)
{
    var distanceMatrix = [];

    for(var i = 0; i < size; i++)
        {
        distanceMatrix[i] = [];

        for(var j = 0; j < size; j++)
        {
            // Along the diagonal, entries should be 0, as that's the distance
            // to one's self.
            if (i == j)
            {
                distanceMatrix[i][j] = 0;
            }
            // Mirror along the diagonal, so we don't end up with a matrix that
            // exists in a universe with non-euclidean geometry.
            else if(j < i)
            {
                distanceMatrix[i][j] = distanceMatrix[j][i];
            }
            // Generate random values for the matrix between 0-10 inclusive.
            else
            {
                distanceMatrix[i][j] = Math.floor(Math.random() * 10) + 1;
            }
        }
    }

    printMatrix(distanceMatrix);
    return distanceMatrix;
}

// Print a nice padded representation of our matrix.
function printMatrix(distanceMatrix)
{
    distanceMatrix.forEach(row => {
        var line = row.map(n => n.toString().padStart(2, " "))
            .join(" ");
        console.log(line);
    });
    console.log("\n");
    // size = distanceMatrix.length;
    // for(var i = 0; i < size; i++)
    // {
    //     console.log(JSON.stringify(distanceMatrix[i]));
    // }
    // console.log("\n");
}

generateRandomDistanceMatrix(0);
generateRandomDistanceMatrix(1);
generateRandomDistanceMatrix(2);
generateRandomDistanceMatrix(3);
generateRandomDistanceMatrix(4);
generateRandomDistanceMatrix(5);
generateRandomDistanceMatrix(6);
generateRandomDistanceMatrix(7);
generateRandomDistanceMatrix(8);
generateRandomDistanceMatrix(9);
generateRandomDistanceMatrix(10);
