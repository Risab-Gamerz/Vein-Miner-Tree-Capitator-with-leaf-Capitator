import { isOre, isGravel } from "./blocks.js";
import { findCluster } from "./utils.js";

// ===== ENCHANT HELPER =====
function getEnchant(player, name) {
  try {
    const equip =
      player.getComponent("minecraft:equippable") ||
      player.getComponent("minecraft:equipment_inventory");

    const tool =
      equip?.getEquipment?.("mainhand") ||
      equip?.getMainhand?.();

    if (!tool) return 0;

    const ench =
      tool.getComponent("minecraft:enchantments")?.enchantments;

    if (!Array.isArray(ench)) return 0;

    for (const e of ench) {
      const id = e?.type?.id || "";
      if (id.toLowerCase().includes(name.toLowerCase())) {
        return e.level || 1;
      }
    }
  } catch {}
  return 0;
}

// ===== MAIN HANDLER =====
export async function handleOreGravel(block, player) {
  const dim = block.dimension;
  const isOreBlock = isOre(block);

  const cluster = findCluster(
    block.location,
    dim,
    isOreBlock ? isOre : isGravel
  );

  if (cluster.length < 2) return;

  const silk = isOreBlock && getEnchant(player, "silk") > 0;
  const fortune = getEnchant(player, "fortune");

  for (const pos of cluster) {
    const cur = dim.getBlock(pos);
    if (!cur) continue;

    // ===== ORES =====
    if (isOreBlock) {
      if (silk) {
        // Silk Touch → drop block itself
        try {
          await dim.runCommandAsync(
            `setblock ${pos.x} ${pos.y} ${pos.z} air`
          );
          await player.runCommandAsync(
            `give @s ${cur.type.id} 1`
          );
        } catch {}
      } else {
        // Normal ore breaking
        try {
          await dim.runCommandAsync(
            `setblock ${pos.x} ${pos.y} ${pos.z} air destroy`
          );
        } catch {}

        // Extra fortune simulation (keeps your original behavior)
        if (fortune > 0) {
          const bonus = Math.floor(Math.random() * (fortune + 1));
          if (bonus > 0) {
            try {
              await player.runCommandAsync(
                `give @s ${cur.type.id.replace("_ore", "")} ${bonus}`
              );
            } catch {}
          }
        }
      }
    }

    // ===== GRAVEL =====
    else {
      // IMPORTANT:
      // Gravel already drops gravel/flint + Fortune
      // Do NOT manually give anything (prevents duplication)
      try {
        await dim.runCommandAsync(
          `setblock ${pos.x} ${pos.y} ${pos.z} air destroy`
        );
      } catch {}
    }
  }
}