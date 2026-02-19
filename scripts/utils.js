import { SETTINGS } from "./config.js";

export const makeKey = (x,y,z)=>`${x},${y},${z}`;
const sq = n => n*n;

export const distanceSq = (a,b)=>
  sq(a.x-b.x)+sq(a.y-b.y)+sq(a.z-b.z);

export function findCluster(start, dim, match){
  const stack=[start];
  const out=[];
  const seen=new Set([makeKey(start.x,start.y,start.z)]);
  const dirs=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];

  while(stack.length && out.length < SETTINGS.maxCluster){
    const p = stack.pop();
    const b = dim.getBlock(p);
    if(!match(b)) continue;

    out.push(p);

    for(const [dx,dy,dz] of dirs){
      const n={x:p.x+dx,y:p.y+dy,z:p.z+dz};

      // FIXED: radius relative to current log
      if(distanceSq(p,n) > SETTINGS.clusterRadius**2) continue;

      const k=makeKey(n.x,n.y,n.z);
      if(seen.has(k)) continue;

      seen.add(k);
      stack.push(n);
    }
  }
  return out;
}