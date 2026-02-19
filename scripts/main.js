import { world } from "@minecraft/server";
import { isLog, isOre, isGravel } from "./blocks.js";
import { handleTree } from "./tree.js";
import { handleOreGravel } from "./ores_gravel.js";

world.beforeEvents.playerBreakBlock.subscribe(async ev=>{
  const {block,player}=ev;
  if(!block||!player?.isSneaking) return;
  if(isLog(block)) await handleTree(block);
  else if(isOre(block)||isGravel(block)) await handleOreGravel(block,player);
});
