import { isLog, isLeaf } from "./blocks.js";
import { SETTINGS } from "./config.js";
import { findCluster, distanceSq, makeKey } from "./utils.js";

export async function handleTree(block){
  const dim = block.dimension;
  const base = block.location;

  const logs = findCluster(base, dim, isLog);
  if (logs.length < 2) return;

  // ---- LOG HEIGHT RANGE ----
  let minY = Infinity, maxY = -Infinity;
  for (const p of logs) {
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  // ---- BREAK LOGS ----
  for (const p of logs) {
    await dim.runCommandAsync(
      `setblock ${p.x} ${p.y} ${p.z} air destroy`
    );
  }

  // ---- TREE-OWNED LEAF CLEAR ----
  let cleared = 0;
  const checked = new Set();

  for (const log of logs) {
    for (let dx = -SETTINGS.leafSearchRadius; dx <= SETTINGS.leafSearchRadius; dx++) {
      for (let dz = -SETTINGS.leafSearchRadius; dz <= SETTINGS.leafSearchRadius; dz++) {

        if (dx*dx + dz*dz > SETTINGS.leafSearchRadius**2) continue;

        for (let y = minY - 2; y <= maxY + 6; y++) {
          if (cleared >= SETTINGS.leafLimit) break;

          const p = { x: log.x+dx, y, z: log.z+dz };
          const key = makeKey(p.x,p.y,p.z);
          if (checked.has(key)) continue;
          checked.add(key);

          const b = dim.getBlock(p);
          if (!isLeaf(b)) continue;

          // 🔥 OWNERSHIP CHECK
          let owned = false;
          for (const l of logs) {
            if (distanceSq(p, l) <= SETTINGS.leafAttachRadius**2) {
              owned = true;
              break;
            }
          }
          if (!owned) continue; // belongs to another tree

          await dim.runCommandAsync(
            `setblock ${p.x} ${p.y} ${p.z} air destroy`
          );
          cleared++;
        }
      }
    }
  }

  // ---- XP ----
  const xp = Math.min(Math.floor(logs.length / 4), 30);
  await dim.runCommandAsync(`xp add @p ${xp} points`);
}