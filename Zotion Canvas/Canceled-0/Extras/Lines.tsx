import { ThreadGenerator, join } from "@motion-canvas/core/lib/threading"
import { map } from "@motion-canvas/core/lib/tweening";
import { PossibleVector2, Vector2 } from "@motion-canvas/core/lib/types"
import { range } from "@motion-canvas/core/lib/utils";
import * as Mathm from './Mathm'

var mayvect: (x: number, y:number)=>Vector2 = 
 (x: number, y:number)=> new Vector2(x, y);
var temp : (()=>Vector2)[];

var finished: (()=>Vector2)[];
const kp: (()=>PossibleVector2)[] = [
    ()=>[-750, 100],
    ()=>[-500, Mathm.Between(80, 120)],
    ()=>[-300, 100],
    ()=>[0, 0],
    ()=>[225, Mathm.Between([0, 5])],
    ()=>[500, 100],
    ()=>[750, 50]
]
const kpos = kp.map(i => ()=>new Vector2(i())).sort((a, b) => a().x - b().x)
//const kpos: (()=>PossibleVector2)[] = kp.map(i => (()=>i));
temp = range(5).map(() => {return () => 
    mayvect(
        Mathm.Between([250, 50]),
        Mathm.Between([100, 15]))
    })
//temp = temp.map(i => new Vector2(i))

kpos.map((v, i, a) => {const f = (pn = 0)=> (i==(a.findIndex(()=>new Vector2(0, 0))-pn)); return (f(1) || f(0) || f(-1))? v(): null})
const temps=(()=>{
    const c: {Vect: Vector2, Bool: boolean, OrginalDex: number}[] = kpos.map(
        (v, i, a) => {const f = (pn = 0)=> (i==(a.findIndex(()=>new Vector2(0, 0))-pn)); return (f(1) || f(0) || f(-1))? v(): null})
    .map((v, i) => {return {Vect: v, Bool:(v!=null), OrginalDex: i}})

    const d: {Vect: Vector2, OrginalDex: number}[] = 
        c.filter(b => !b.Bool).map(c => {return { Vect: c.Vect, OrginalDex: c.OrginalDex}}).filter(or2 => or2.Vect==Vector2.zero)
    return d})().sort((a, b) => a.Vect.x - b.Vect.x ).map(v => {
        
    })

//.map(() => { return kpos[kpos.findIndex(()=> new Vector2(0, 0))-(Math.random()>.5?1:-1)]}).map(v => {})



kpos.push(()=>new Vector2(300, 100))
const knotpos = [...kpos].map(i => (()=>new Vector2(i()))).sort((a, b) => a().x - b().x);
export { knotpos as pos }