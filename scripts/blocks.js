export const BLOCK_GROUPS = {
    ores: [
        "minecraft:ancient_debris",
        "minecraft:coal_ore",
        "minecraft:copper_ore",
        "minecraft:deepslate_coal_ore",
        "minecraft:deepslate_copper_ore",
        "minecraft:deepslate_diamond_ore",
        "minecraft:deepslate_emerald_ore",
        "minecraft:deepslate_gold_ore",
        "minecraft:deepslate_iron_ore",
        "minecraft:deepslate_lapis_ore",
        "minecraft:deepslate_redstone_ore",
        "minecraft:diamond_ore",
        "minecraft:emerald_ore",
        "minecraft:gold_ore",
        "minecraft:iron_ore",
        "minecraft:lapis_ore",
        "minecraft:lit_deepslate_redstone_ore",
        "minecraft:lit_redstone_ore",
        "minecraft:nether_gold_ore",
        "minecraft:nether_quartz_ore",
        "minecraft:redstone_ore"
    ],
    logs: [
        "minecraft:acacia_log",
        "minecraft:birch_log",
        "minecraft:cherry_log",
        "minecraft:crimson_stem",
        "minecraft:dark_oak_log",
        "minecraft:jungle_log",
        "minecraft:mangrove_log",
        "minecraft:oak_log",
        "minecraft:spruce_log",
        "minecraft:stripped_acacia_log",
        "minecraft:stripped_birch_log",
        "minecraft:stripped_cherry_log",
        "minecraft:stripped_crimson_stem",
        "minecraft:stripped_dark_oak_log",
        "minecraft:stripped_jungle_log",
        "minecraft:stripped_mangrove_log",
        "minecraft:stripped_oak_log",
        "minecraft:stripped_spruce_log",
        "minecraft:stripped_warped_stem",
        "minecraft:warped_stem"
    ],
    leaves: [
        "minecraft:acacia_leaves",
        "minecraft:birch_leaves",
        "minecraft:cherry_leaves",
        "minecraft:crimson_hyphae",
        "minecraft:dark_oak_leaves",
        "minecraft:jungle_leaves",
        "minecraft:mangrove_leaves",
        "minecraft:oak_leaves",
        "minecraft:spruce_leaves",
        "minecraft:warped_hyphae"
    ],
    gravel: ["minecraft:gravel"]
};

export const isOre = b => !!b?.type && BLOCK_GROUPS.ores.includes(b.type.id);
export const isLog = b => !!b?.type && BLOCK_GROUPS.logs.includes(b.type.id);
export const isLeaf = b => !!b?.type && BLOCK_GROUPS.leaves.includes(b.type.id);
export const isGravel = b => !!b?.type && BLOCK_GROUPS.gravel.includes(b.type.id);