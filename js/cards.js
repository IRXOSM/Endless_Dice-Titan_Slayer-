const CARDS = {
    d1: [
        "Side Increaser",
        x=>`Increase ${['your',"enemy's"][x]} maximum number of side by <b class='green'>2</b>`,
        x=>data.round < 10,
        x=>{
            data[x].max_s += 2
        },
    ],
    d2: [
        "Side Increaser",
        x=>`Increase ${['your',"enemy's"][x]} maximum number of side by <b class='green'>3</b>`,
        x=>true,
        x=>{
            data[x].max_s += 3
        },
    ],
    d3: [
        "Minimum Side Increaser",
        x=>`Increase ${['your',"enemy's"][x]} minimum number of side by <b class='green'>2</b>`,
        x=>data[x].min_s<data[x].max_s && data.round < 10,
        x=>{
            data[x].min_s += 2
        },
    ],
    d4: [
        "Side Translation",
        x=>`Increase ${['your',"enemy's"][x]} minimum & maximum number of side by <b class='green'>1</b>`,
        x=>true,
        x=>{
            data[x].min_s += 1
            data[x].max_s += 1
        },
    ],
    d5: [
        "Side Re-Increaser",
        x=>`Increase ${['your',"enemy's"][x]} maximum number of side by <b class='green'>4</b>`,
        x=> data.round >= 10,
        x=>{
            data[x].max_s += 4
        },
    ],
    d6: [
        "Side Expansion",
        x=>`Increase ${['your',"enemy's"][x]} minimum & maximum number of side by <b class='green'>2</b>`,
        x=>true,
        x=>{
            data[x].min_s += 2
            data[x].max_s += 2
        },
    ],
    d7: [
        "Scrambler",
        x=>`${['Your',"Enemy's"][x]} spawned Dice has 15% chance to transform into <b class='green'>Dice Scrambler</b>`,
        x=>!data[x].cards.includes("d7"),
        x=>{},
    ],

    s1: [
        "Sacrifice for Multiplier",
        x=>`Sacrifice <b class='green'>50%</b> of your health for increasing the multiplier of product by <b class='green'>0.5</b>`,
        x=>x=="player" && data.round < 20,
        x=>{
            data[x].health = Math.ceil(data[x].health*1)
            data[x].mult += 0.5
        },
    ],
    s2: [
        "Sacrifice for Multiplier",
        x=>`Sacrifice <b class='green'>all</b> of your health for increasing the multiplier of product by <b class='green'>1</b>`,
        x=>x=="player" && data.round >= 20,
        x=>{
            data[x].health = 1
            data[x].mult += 1
        },
    ],
    e1: [
        "Energy Increaser",
        x=>`Increase ${['your',"enemy's"][x]} maximum energy by <b class='green'>1</b>`,
        x=>data[x].maxEnergy<20,
        x=>{
            data[x].maxEnergy += 1
        },
    ],
    e2: [
        "Energy Increaser",
        x=>`Increase ${['your',"enemy's"][x]} maximum energy by <b class='green'>2</b>`,
        x=>data[x].maxEnergy>15,
        x=>{
            data[x].maxEnergy += 2
        },
    ],
    e3: [
        "Free Energy",
        x=>`Consuming ${['your',"enemy's"][x]} energy has <b class='green'>20%</b> chance to get <b class='green'>2</b> free energy`,
        x=>!data[x].cards.includes("e3"),
        x=>{},
    ],
    e4: [
        "Energy Increaser",
        x=>`Increase ${['your',"enemy's"][x]} maximum energy by <b class='green'>1</b>`,
        x=>true,
        x=>{
            data[x].maxEnergy += 1
        },
    ],
    
    en2: [
        "Stronger Enemy",
        x=>`Increase enemy's multiplier by <b class='green'>1</b>`,
        x=>x=="enemy" && data.round < 10,
        x=>{
            data.enemy.mult += 1
        },
    ],
    en3: [
        "Mega Enemy",
        x=>`Increase enemy's multiplier by <b class='green'>1.5</b>`,
        x=>x=="enemy" && data.round >= 10,
        x=>{
            data.enemy.mult += 1.5
        },
    ],
    en4: [
        "Catastrophic",
        x=>`Increase enemy's multiplier by <b class='green'>2</b>`,
        x=>x=="enemy" && data.round >= 20,
        x=>{
            data.enemy.mult += 2
        },
    ],
    en5: [
        "Giant Enemy",
        x=>`Increase enemy's starting health by <b class='green'>30%</b>`,
        x=>x=="enemy" && data.round >= 30,
        x=>{
            data.enemy.maxHealth = Math.floor(data.enemy.maxHealth*1.3)
        },
    ],

    m1: [
        "Multiplier Increaser",
        x=>`Increase ${['your',"enemy's"][x]} multiplier by <b class='green'>0.2</b>`,
        x=>true,
        x=>{
            data[x].mult += 0.2
        },
    ],
    m2: [
        "Multiplier Expansion",
        x=>`Increase ${['your',"enemy's"][x]} multiplier by <b class='green'>0.4</b>`,
        x=>data.round >= 10,
        x=>{
            data[x].mult += 0.4
        },
    ],

    o1: [
        "Cleaner",
        x=>`Clear all of your dices`,
        x=>x=="player",
        x=>{
            data.p_grid = {}
        },
    ],
    o2: [
        "Normality",
        x=>`Normal dice can attack <b class='green'>${['25%',"50%"][x]}</b> of ${['your',"enemy's"][x]} product to ${['an enemy',"you"][x]}`,
        x=>!data[x].cards.includes("o2"),
        x=>{},
    ],

    curse1: [
        "Holy Multiplier",
        x=>`Multiply your number of side as well as your multiplier by <b class='green'>1.5</b>.
        <b class='red'>CAN ONLY BE PICKED UP ONCE.</b>`,
        x=>!data[x].cards.includes("curse1") && Math.random() < 1/10,
        x=>{
            data[x].min_s *= 1.5
            data[x].max_s *= 1.5

            data[x].mult *= 1.5
        },
    ],
    curse2: [
        "Cursed Heart",
        x=>`If you pass a round, will increase your health by <b class='green'>10%</b>, but increase enemy's multiplier by <b class='red'>10%</b> for passing it`,
        x=>x=="player",
        x=>{},
    ],

    c1: [
        "Critical Chance",
        x=>`Increase ${['your',"enemy's"][x]} critical chance by <b class='green'>5%</b>`,
        x=>data[x].crit<1,
        x=>{
            data[x].crit += 0.05
        },
    ],
}

