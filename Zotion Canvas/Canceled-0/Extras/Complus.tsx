import { CanvasStyle, Gradient, PossibleCanvasStyle } from "@motion-canvas/2d/lib/partials";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { map } from "@motion-canvas/core/lib/tweening";
import { Color, PossibleColor } from "@motion-canvas/core/lib/types";
import { range } from "@motion-canvas/core/lib/utils";
import * as fs from 'fs'
import * as ts from 'typescript'

type Arrow<T> = ()=>T;
type gcolrs = { offset: number, color: Color}
interface g{
	type?: 'linear' | 'conic' | 'radial',
	width: number,
	colors: PossibleColor[]
}
type inbetween = [Value: number, Range: number]
const Random: (from: number, to: number)=>number = (from: number, to: number)=> map(from, to, Math.random())
const Between = (inbetween: inbetween) => Random(inbetween[0]-inbetween[1], inbetween[0]+inbetween[1]);

//const Mathm = {
//	Random: (from: number, to: number)=> map(from, to, Math.random()),
//	Between: (inbetween: [Number:number, value:number])=>number= (inbetween: [Number:number, value:number]) => Random(inbetween[0]-inbetween[1], inbetween[0]+inbetween[1])	
//}



const createGradent = (vs: g)=> 
new Gradient({
	type: (vs.type!=null)? vs.type: 'linear', from: [-vs.width / 2, 0], to:[vs.width / 2, 0],
	stops: (vs.colors.map((v, i)=>{ return {offset: 1/vs.colors.length, color:new Color(i)}}))
})

type createdG = Gradient & {width: SignalValue<number>, colors: SignalValue<PossibleColor>[]}


export function* Until(t1: any, t2: any): ThreadGenerator
{
	while(t1 != t2)
	{
		yield
	}
}


export {createGradent}
//ts.parseJsonText('s',)
