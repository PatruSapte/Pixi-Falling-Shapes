import * as PIXI from 'pixi.js';
function vectorProd (v1, v2) {
    return v1.x * v2.y - v1.y * v2.x;
}
export const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export function polygonArea (points) {
    return points.reduce((prev, curr, index, array) => prev + (index > 0 ? vectorProd(array[index - 1], curr) : 0), 0) / 2;
}

export const EVENT_TYPES = {
    ADD_SHAPE: 'addShape',
    TICK: 'tick',
    GRAVITY_UPDATE: 'gravityUpdate',
    SHAPES_PER_SECOND_UPDATE: 'shapesPerSecondUpdate'
};

export const SHAPE_SIZE_LIMIT = {
    HEIGHT: {
        MIN: 20,
        MAX: 40
    },
    WIDTH: {
        MIN: 20,
        MAX: 40
    }
};
function orientation(p, q, r)
{
    let val = (q.y - p.y) * (r.x - q.x) -
                  (q.x - p.x) * (r.y - q.y);
        
        if (val == 0) return 0;  // collinear
        return (val > 0)? 1: 2; // clock or counterclock wise
}
 
export function  getConvextPolygonPath(points:{x:number,y:number}[], n:number):PIXI.Point[]
{
    if(n<3) return;
    
    let hull:{x:number,y:number}[];
    hull = [];
    
    // Find the leftmost point
    let l = 0;
    for(let i=1;i<n;i++) {
        if (points[i].x < points[l].x){
            l = i;
        }   
    }


    // Start from leftmost point, keep moving counterclockwise
    // until reach the start point again.  This loop runs O(h)
    // times where h is number of points in result or output.
    let p=l;
    let q;
    do {
        // Add current point to result
        hull.push(points[p]);

        // Search for a point 'q' such that orientation(p, q,
        // x) is counterclockwise for all points 'x'. The idea
        // is to keep track of last visited most counterclock-
        // wise point in q. If any point 'i' is more counterclock-
        // wise than q, then update q.
        q=(p+1)%n;
        for(let i=0;i<n;i++) {
            // If i is more counterclockwise than current q, then
            // update q
            if (orientation(points[p], points[i], points[q]) == 2)
               q = i;
        }
        // Now q is the most counterclockwise with respect to p
        // Set p as q for next iteration, so that q is added to
        // result 'hull'
        p=q;
    }  while(p!=l);

    let pointsPath = [];
    for(let i =0;i<hull.length;i++)
    {
        let point = new PIXI.Point(hull[i].x,hull[i].y);
        pointsPath.push(point);
    }
    return pointsPath;
}
