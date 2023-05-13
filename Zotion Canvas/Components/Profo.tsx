import { Layout, LayoutProps as Layoutprops, Line, Node, Rect, RectProps, Txt } from "@motion-canvas/2d/lib/components";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { Color, ColorSignal, PossibleVector2, Vector2 } from "@motion-canvas/core/lib/types";
import { initial, signal } from '@motion-canvas/2d/lib/decorators';
import { createRef, makeRef, range } from "@motion-canvas/core/lib/utils";
import { Profile } from "./Profile";
const fontstyle = 26;

type pars<T>= (v?: Partial<T>)=>T;

const VaL = (amount: number, from: PossibleVector2, to: PossibleVector2, rev: boolean = true)=> 
	range(amount+2).map((v,i,a)=> (i+1)/a.length).map(v => Vector2.arcLerp(new Vector2(from), new Vector2(to), v, rev));
const pon: Vector2[]=[[-217, 0], ...VaL(5, [-217, -200], [-175, -225]),	...VaL(5, [-175, -205], [-10, -215]), [-10, -215]].map(v=>new Vector2((v as PossibleVector2)))

interface font {
	name: SignalValue<globalThis.Fonts>
	media: SignalValue<globalThis.Fonts>
	status: SignalValue<globalThis.Fonts>
	description: SignalValue<globalThis.Fonts>
}

export interface ProfoProps extends Omit<Layoutprops, 'size'>{
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
	public declare readonly about: SimpleSignal<string, this>

	@initial('232428') @signal()
	public declare readonly Primary: ColorSignal<this>

	@initial('35373C') @signal()
	public declare readonly Accent: ColorSignal<this>

	readonly parent: SimpleSignal<Profile | null, void>

	private Background = createRef<Rect>()
	private infobox: Node & { Main?: Rect, About?: Rect } =
	(<Rect size={[415, 520]} position={[0, 75]} fill={'181818'} clip smoothCorners cornerSharpness={1.1} radius={70}/>)
	private text = {
		Name: createRef<Txt>(),
		Media: createRef<Txt>(),
		Status: createRef<Txt>(),		
		Description: createRef<Txt>(),
	}

	constructor(props?: ProfoProps){
		super({ size: [405, 600], ...props})
		if(this.media() == '@NONAME'){ this.media(()=>`@${this.name()}`)}
		this.about(props.description)
		this.infobox.add(<Rect ref={makeRef(this.infobox, 'Main')} size={[415, 137]} position={[0, -181]} clip/>)
		this.add(
		<Rect ref={this.Background} fill={this.Accent()} size={this.size().mul([1.1, 1.21])} scale={0.9}
		smoothCorners cornerSharpness={1} radius={90} clip>
			<Layout>
				<Line fill={this.Primary} stroke={this.Primary} lineWidth={10} lineJoin={'round'} closed
				points={[...pon, ...pon.map(v => v.mul([-1, 1])).reverse()].map(v => ([v.x, v.y] as PossibleVector2))}/>
				<Rect fill={this.Primary()} size={[450,370]} offset={[0, -1]}/>
			</Layout> {this.infobox}</Rect>
		)
		this.infobox.Main.add(<>
		<Rect layout fontFamily={'comic sans'} size={[220, 25]} scale={1.75} offset={[0.04, 2]}> 
		<Txt ref={this.text.Name} fill={'white'} text={this.name} fontSize={fontstyle}/> </Rect>
		<Rect layout size={[220, 25]} offset={[.225, 0]} scale={1.5} fontFamily={'christmas chalk'}> 
		<Txt ref={this.text.Media} text={this.media} fontSize={Math.round(.75*fontstyle)} fill={'white'}/></Rect>
		<Rect layout size={[220, 25]} offset={[.23, -2]} scale={1.5} fontFamily={'Roboto'} fontSize={.987*fontstyle}> 
		<Txt ref={this.text.Status} text={this.status} fill={'white'}/> </Rect>
		</>)
		this.infobox.add(<Line points={[200, -200].map((v=> new Vector2(v, 0)))} position={[0, -100]} stroke={'595959'} lineWidth={5}/>)
		this.infobox.add(
		<Rect ref={makeRef(this.infobox,'About')} size={[387, 337]} position={[0, 80]} textWrap clip layout direction={'column'}>
			<Txt fill={'e6e6e6'} text={'About Me'} fontFamily={'mateos'} fontSize={30}
			stroke={'gray'} strokeFirst lineWidth={6} lineJoin={'round'}/>
			<Txt ref={this.text.Description} text={this.about} scale={.97} fill={'white'} fontFamily={'Permanent Marker'}
			fontSize={27} stroke={'black'} lineJoin={'miter'} lineWidth={5} strokeFirst/>
		</Rect>
		)
	}
}
