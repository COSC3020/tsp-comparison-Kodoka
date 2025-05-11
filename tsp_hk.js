function tsp_hk(distance_matrix) {
    let minDist = Infinity;

    for (let start = 0; start < distance_matrix.length; start++) {
        let visited = new Set([start]);
        let dist = rec_hk(distance_matrix, start, visited);
        if (dist < minDist) minDist = dist;
    }
    return minDist === Infinity ? 0 : minDist;
}

function rec_hk(matrix, current, visited, memoization = {}) {
    let key = current + "|" + [...visited].sort();

    if (memoization[key] != undefined) return memoization[key];
    if (visited.size === matrix.length) return 0;

    let minDist = Infinity;

    for (let i = 0; i < matrix.length; i++) {
        if (!visited.has(i) && matrix[current][i] !== 0) {
            visited.add(i);
            let dist = matrix[current][i] + rec_hk(matrix, i, visited, memoization);
            if (dist < minDist) minDist = dist;
            visited.delete(i);
        }
    }

    memoization[key] = minDist;
    return minDist;
}

module.exports = { tsp_hk };