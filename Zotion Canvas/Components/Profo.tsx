import { Knot, Layout, LayoutProps as Layoutprops, Line, Node, Rect, RectProps, Spline, Txt } from "@motion-canvas/2d/lib/components";
import { CompoundSignal, CompoundSignalContext, DependencyContext, SignalValue, SimpleSignal, createSignal } from "@motion-canvas/core/lib/signals";
import { Profile } from "./Profile";
import { Color, ColorSignal, PossibleVector2, Vector2 } from "@motion-canvas/core/lib/types";
import { Length } from "@motion-canvas/2d/lib/partials";
import { compound, computed, initial, initializeSignals, parser, signal, colorSignal } from '@motion-canvas/2d/lib/decorators';
import { Reference, createRef, makeRef, range, useLogger } from "@motion-canvas/core/lib/utils";
import * as Ifos from './Profo.json'

type Name = string & {Media: string};
type pars<T>= (v?: Partial<T>)=>T;
type LayoutProps = Omit<Layoutprops, 'size'>;

const Parsers: {RPC: pars<RPC>} = {
	RPC: (v?: Partial<RPC>)=>{return {...(v ?? {})}}
}
const VaL = (amount: number, from: PossibleVector2, to: PossibleVector2, rev: boolean = true)=> 
	range(amount+2).map((v,i,a)=> (i+1)/a.length).map(v => Vector2.arcLerp(new Vector2(from), new Vector2(to), v, rev));
const pon: Vector2[]=[[-217, 0], ...VaL(5, [-217, -200], [-175, -225]),	...VaL(5, [-175, -205], [-10, -215]), [-10, -215]]
	.map(v=>new Vector2((v as PossibleVector2)))
interface RPC{
	Thing?: string,
	Details?: string,
	State?: string,
	Time?: string
	Image?: string,
	Icon?: string
}
type SRPC= {
	Thing?: SignalValue<string>, Details?: SignalValue<string>, State?: SignalValue<string>, Time?: SignalValue<string>,
	Img?: SignalValue<string>, Icon?: SignalValue<string>,
	RichPresence?: SignalValue<RPC> 
}

export interface ProfoProps extends LayoutProps{
	name: SignalValue<string>, media?: SignalValue<string>, status?: SignalValue<string>, description?: SignalValue<string>,
	Primary?: SignalValue<Color>, Accent?: SignalValue<Color> 
}

export class Profo extends Layout{

	@signal()
	public declare readonly name: SimpleSignal<string, this>

	@initial(`@NONAME`) @signal()
	public declare readonly media: SimpleSignal<string, this>

	@initial('Doing Nothing') @signal()
	public declare readonly status: SimpleSignal<string, this>

	@initial('') @signal()
	public declare readonly description: SimpleSignal<string, this>



	@initial('232428') @signal()
	public declare readonly Primary: ColorSignal<this>

	@initial('35373C') @signal()
	public declare readonly Accent: ColorSignal<this>

	private Background = createRef<Rect>()
	private infobox: Node & {} =
	(<Rect size={[415, 500]} position={[0, 75]} fill={'green'} clip smoothCorners cornerSharpness={1.1} radius={70}/>)
	private text = {
		Name: createRef<Txt>(),
		Media: createRef<Txt>(),
		Status: createRef<Txt>(),		
		Description: createRef<Txt>(),
	}

	constructor(props?: ProfoProps){
		super({ size: [405, 600], ...props})
		if(this.media() == '@NONAME'){ this.media(()=>`@${this.name()}`)}

		this.add(
		<Rect ref={this.Background} fill={this.Accent()} size={this.size().mul([1.1, 1.21])} scale={0.9}
		smoothCorners cornerSharpness={.8} radius={90} clip>
			<Layout>
				<Line fill={this.Primary()} stroke={'232428'} lineWidth={10} lineJoin={'round'} closed
				points={[...pon, ...pon.map(v => v.mul([-1, 1])).reverse()].map(v => ([v.x, v.y] as PossibleVector2))}/>
				<Rect fill={this.Primary()} size={[450,370]} offset={[0, -1]}/>
			</Layout> {this.infobox}</Rect>)

		this.infobox.add(
		<Rect size={[415, 137]}  position={[0, -181]} fill={'black'} clip>
			<Rect layout fontFamily={'comic sans'} size={[220, 25]} scale={1.75} offset={[0.04, 2]}> 
			<Txt ref={this.text.Name} textAlign={'right'} fill={'white'} text={this.name} fontSize={Ifos.FS}/> </Rect>

			<Rect layout size={[220, 25]} offset={[.225, 0]} scale={1.5} fontFamily={'christmas chalk'}> 
				<Txt ref={this.text.Media} textAlign={'right'} text={this.media} fill={'white'} 
				fontSize={Math.round(.75*Ifos.FS)} letterSpacing={1.5}/> </Rect>

			<Rect layout size={[220, 25]} offset={[.23, -2]} scale={1.5} fontFamily={'Roboto'}> 
			<Txt ref={this.text.Status} textAlign={'right'} text={this.status} fill={'white'} fontSize={0.987*Ifos.FS}/>
			</Rect>	</Rect>)
		
	}
}

//<Txt ref={this.Name} text={props.Name.toString()} fill={'white'} offset={[4.5, 10]}/>