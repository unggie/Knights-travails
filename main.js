function Vertex(array) {
    let x = array[0];
    let y = array[1];
    return { x, y }
}

function knightMoves(startArray, endArray) {
    if (typeof startArray !== "object" || typeof endArray !== "object") {
        throw new Error("The start and endpoint must to entered as an array of coordinate i.e. [x, y]=>[0, 1]");
    }

    let startVertex = Vertex(startArray);
    let endVertex = Vertex(endArray);

    if (startVertex.x > 7 || startVertex.x < 0 || startVertex.y > 7 || startVertex.y < 0) { 
        throw new Error("The start coordinates are out of range");
    }
    if (endVertex.x > 7 || endVertex.x < 0 || endVertex.y > 7 || endVertex.y < 0) { 
        throw new Error("The end coordinates are out of range");
    }
    function possibleMoves(array) {
        const legalMoves = [];
        const AllMoves = [
            [array.x + 1, array.y + 2], 
            [array.x - 1, array.y - 2], 
            [array.x + 1, array.y - 2], 
            [array.x - 1, array.y + 2],
            [array.x + 2, array.y + 1], 
            [array.x - 2, array.y - 1], 
            [array.x + 2, array.y - 1], 
            [array.x - 2, array.y + 1],
        ];
        for (let i = 0; i < AllMoves.length; i++) {
            if ((AllMoves[i][0] >= 0 && AllMoves[i][0] <= 7) && (AllMoves[i][1] >= 0 && AllMoves[i][1] <= 7)) {
                legalMoves.push(AllMoves[i]);
            }
        }
        const legalMoveVertex = [];
        legalMoves.forEach(element => legalMoveVertex.push(Vertex(element)));
        return legalMoveVertex;
    } 
    function pathSearch(startPoint = startVertex, endPoint = endVertex) {
        const queue = [];
        const visited = new Set();

        queue.push({
            node: startPoint,
            path: [[startPoint.x, startPoint.y]]
        })

        visited.add(`${startPoint.x}, ${startPoint.y}`);

        while (queue.length > 0) {
            const { node, path } = queue.shift();
            const neighbors = possibleMoves(node);
            if (node.x === endPoint.x && node.y === endPoint.y) {
                return path;
            } else {
                for (const neighbor of neighbors) {
                    const neighborKey = `${neighbor.x}, ${neighbor.y}`;
                    if (!visited.has(neighborKey)) {
                        visited.add(neighborKey);

                        queue.push({
                            node: neighbor,
                            path: [...path, [neighbor.x, neighbor.y]]
                        });
                    }  
                }
            }
        }
        return null;
    }
    // function pathSearch(startPoint = startVertex, endPoint = endVertex) {

    //     // The queue stores nodes that we still need to explore.
    //     // BFS explores nodes level-by-level, so the first path
    //     // that reaches the end point will be the shortest path.
    //     const queue = [];

    //     // Keeps track of nodes that we have already discovered.
    //     // This prevents us from visiting the same node repeatedly
    //     // and getting stuck in cycles.
    //     const visited = new Set();


    //     // Add the starting node to the queue.
    //     //
    //     // We also store the path taken to reach that node.
    //     // At the beginning, the path only contains the start point.
    //     queue.push({
    //         node: startPoint,
    //         path: [[startPoint.x, startPoint.y]]
    //     });


    //     // Mark the starting point as visited.
    //     //
    //     // We convert its coordinates into a string so that
    //     // the Set can easily identify this particular position.
    //     //
    //     // Example:
    //     // x = 2, y = 3
    //     // key = "2, 3"
    //     visited.add(`${startPoint.x}, ${startPoint.y}`);


    //     // Continue searching while there are still nodes
    //     // waiting in the queue.
    //     while (queue.length > 0) {

    //         // Remove the FIRST item from the queue.
    //         //
    //         // This is what makes this BFS:
    //         // First In → First Out (FIFO)
    //         //
    //         // node = the current position we are exploring
    //         // path = the complete path used to reach that position
    //         const { node, path } = queue.shift();


    //         // Find all valid positions that we can move to
    //         // from the current node.
    //         const neighbors = possibleMoves(node);


    //         // Check whether the current node is our destination.
    //         //
    //         // If we reached the destination, return the path
    //         // that was used to get here.
    //         //
    //         // Because BFS explores level-by-level, this is
    //         // guaranteed to be the shortest path when every
    //         // movement has the same cost.
    //         if (node.x === endPoint.x && node.y === endPoint.y) {

    //             return path;

    //         } else {

    //             // Examine every possible neighboring position.
    //             for (const neighbor of neighbors) {

    //                 // Create a unique key for this neighbor
    //                 // using its x and y coordinates.
    //                 //
    //                 // Example:
    //                 // neighbor = { x: 2, y: 3 }
    //                 // neighborKey = "2, 3"
    //                 const neighborKey = `${neighbor.x}, ${neighbor.y}`;


    //                 // Only process this neighbor if we have
    //                 // NOT already visited it.
    //                 if (!visited.has(neighborKey)) {

    //                     // Mark the neighbor as visited immediately.
    //                     //
    //                     // This prevents the same node from being
    //                     // added to the queue multiple times.
    //                     visited.add(neighborKey);


    //                     // Add the neighbor to the queue.
    //                     //
    //                     // We also create a NEW path by copying the
    //                     // current path and adding the neighbor to it.
    //                     //
    //                     // Example:
    //                     //
    //                     // Current path:
    //                     // [[0, 0], [1, 0]]
    //                     //
    //                     // New neighbor:
    //                     // [1, 1]
    //                     //
    //                     // New path:
    //                     // [[0, 0], [1, 0], [1, 1]]
    //                     queue.push({
    //                         node: neighbor,
    //                         path: [...path, [neighbor.x, neighbor.y]]
    //                     });


    //                     // Display the item that was just added
    //                     // to the queue. Useful for seeing how BFS
    //                     // explores the graph while debugging.
    //                     console.log("Queue: ", queue[queue.length - 1]);
    //                 }
    //             }
    //         }
    //     }


    //     // If the queue becomes empty, BFS explored every reachable
    //     // node without finding the destination.
    //     //
    //     // null means:
    //     // "There is no path from startPoint to endPoint."
    //     return null;
    // }

    return pathSearch();
}

console.log(knightMoves([0, 0], [7, 7]));

