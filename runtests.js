const { tsp_hk } = require('./tsp_hk.js');
const { tsp_ls } = require('./tsp_ls.js');
const fs = require('fs');
const { performance } = require('perf_hooks');

function runTests()
{
    // Max runtime is 1 hour, in milliseconds.
    var maxRunTime = 3600000;
    var size = 2;
    var previousHKTime = 0;
    var previousLSTime = 0;

    while(previousHKTime < maxRunTime)
    {
        // Generate distance matrix for this size.
        var distanceMatrix = generateRandomDistanceMatrix(size);

        // Use tsp_hk on our distance matrix, and time the process.
        var hkStart = performance.now();
        var hkResults = tsp_hk(distanceMatrix);
        var hkEnd = performance.now();
        previousHKTime = hkEnd - hkStart;

        // Use tsp_ls on our distance matrix, and time the process.
        var lsStart = performance.now();
        var lsResults = tsp_ls(distanceMatrix);
        var lsEnd = performance.now();
        previousLSTime = lsEnd - lsStart;

        // Prepare information relating to the current test matrix for logging.
        var entry = "";
        entry += "Size: " + size + "\n";
        entry += "Matrix:\n" + printMatrix(distanceMatrix);
        entry += "HK Time (MS): " + previousHKTime + "\n";
        entry += "HK Distance: " + hkResults[0] + "\n";
        entry += "HK Path: " + JSON.stringify(hkResults[1]) + "\n";
        entry += "LS Time (MS): " + previousLSTime + "\n";
        entry += "LS Distance: " + lsResults[0] + "\n";
        entry += "LS Path: " + JSON.stringify(lsResults[1]) + "\n\n"; 
        
        // Log testing information.
        fs.appendFileSync("results.txt", entry);

        // Debug code to make sure the process is still moving.
        console.log("Size: " + size + "\nHK: " + previousHKTime + "ms\nLS: " + previousLSTime + "ms\n");
        size++;
    }
}

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

    return distanceMatrix;
}

// Return a nice padded representation of our matrix to be printed.
function printMatrix(distanceMatrix)
{
    var lines = [];
    distanceMatrix.forEach(row => {
        var line = row.map(n => n.toString().padStart(2, " ")).join(" ");
        lines.push(line)
    });

    return lines.join("\n") + "\n";
}

runTests();