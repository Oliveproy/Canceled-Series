import { Circle, CubicBezier, Img, Knot, Layout, LayoutProps, Line, Node, NodeProps, Spline } from "@motion-canvas/2d/lib/components";
import { colorSignal, compound, computed, initial, parser, signal } from '@motion-canvas/2d/lib/decorators';
import { CompoundSignal, Computed, createComputed, createSignal, DependencyContext, SignalValue, SimpleSignal } from '@motion-canvas/core/lib/signals';
import { ColorSignal, PossibleColor, PossibleVector2, Vector2 } from "@motion-canvas/core/lib/types";
import { Reference, createRef, makeRef, range, useLogger, viaProxy } from "@motion-canvas/core/lib/utils";
import { all, chain, every, loop, waitFor } from '@motion-canvas/core/lib/flow';
import { Thread, ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { GetDisc } from '../Extras/API'
import * as DiscordID from './DiscordID.json'
import { Cord } from "./Procord";
type part<T> = (v?:Partial<T>)=>T
type SimpleCompound<T, TReturn> = CompoundSignal<Partial<T>, T, keyof T, TReturn>;
type Omt<T, R extends keyof T> = Omit<T, R>
type Omtt<T, R extends keyof T, R2 extends keyof Omit<T, R>> = Omit<Omt<T, R>, R2>

type talkingtypes = 'glow'| 'flipin'
type Emotions = 'Normal' | 'Angry'| 'Sad'

const parss: {emotions: part<emotionsrc>}= {
	emotions: (v?: Partial<emotionsrc>)=>{ return { AngrySrc: '', SadSrc: '', ...(v as {})} }
}


export interface ProfileProps extends LayoutProps{
	src: SignalValue<string>
	
	ImgSize?: SignalValue<number>
	talkcolor?: SignalValue<PossibleColor>, backcolor?: SignalValue<PossibleColor>
	talking?: SignalValue<boolean>
	Linkedto?: SignalValue<Profile>
}
export class Profile extends Layout {


	@initial(2.5) @signal() public declare readonly ImgSize: SimpleSignal<number, this>
	@initial(false) @signal() public declare readonly talking: SimpleSignal<boolean, this>
	@initial('#242424') @colorSignal() public declare readonly backcolor: ColorSignal<this>
	@initial('#3ac81e') @colorSignal() public declare readonly talkcolor: ColorSignal<this>
	@signal() public declare readonly src: SimpleSignal<string, this>
	@signal() public declare readonly Linkedto: SimpleSignal<Profile, this>

	protected Background = createRef<Circle>()
	protected TalkBar = createRef<Spline>()
	protected pfp: Reference<Img> & {Emotion?: Img} = createRef<Img>()
	protected Link? = createRef<Spline>()
	protected knots?= { start: createRef<Knot>(), others:() => ([] as Knot[]), end: createRef<Knot>()	}

	constructor(props?: ProfileProps){
		super({size: 255,	...props})
		const Diameter= 105;
		
		this.add(
			<Circle ref={this.Background} fill={this.backcolor} size={this.size()}
			lineWidth={5} lineJoin={'round'} stroke={'#484848'} clip>
				<Spline ref={this.Link} strokeFirst stroke={'#FFF'} lineWidth={6} end={0}>
					<Knot ref={this.knots.start}/>
					<Knot ref={this.knots.end}/>
				</Spline>

				<Spline ref={this.TalkBar} lineWidth={7} stroke={this.talkcolor} smoothness={0} closed
				end={()=>this.talking()==true?1:0} size={()=>this.size().mul([.9,.9])}>
					{[-1, 1].map(v => v*Diameter).map
					(D => (<Knot position={[0, D*1.01]} startHandle={[D*1.36, 0]} endHandle={[-D*1.36, 0]}/>))}
    			</Spline>
				<Circle size={220} clip> <Img ref={this.pfp} scale={this.ImgSize} src={this.src} opacity={100}/> </Circle>
			</Circle>
		)
	}

	public *Talk(Methed: talkingtypes, duration: number): ThreadGenerator
	{
		switch (Methed) {
			case 'flipin':
				const faced = this.scale()
				const face = () => new Vector2(-this.scale().x, this.scale().y)
				this.scale(face, .1).next(yield* waitFor(1)) 
			break;

			case 'glow':
				this.talking(true)
				this.TalkBar().end(100)
				yield* waitFor(duration)
				this.talking(false)
				this.TalkBar().end(0)
			break;
		}
	}
}

interface emotionsrc{
	AngrySrc?: SignalValue<string>
	SadSrc?: SignalValue<string>
}
type People = 'Micah' | 'Venqm' | 'Onyx' | 'Wqffle' | 'Dani'
export interface PersonProps extends Omt<ProfileProps, 'src'>{
	who: SignalValue<People>

	talking?: SignalValue<boolean>
	Linkedto?: SignalValue<Profile>
	UseCurrent?: SignalValue<Boolean>
}

export class Person extends Profile{
	@signal() public declare readonly who: SimpleSignal<People, this>
	@initial(false) @signal() public declare readonly UseCurrent: SimpleSignal<boolean, this>
	protected static cache = new Map<string, Cord>();

	@computed()
	private Cord(){let discid: string; switch(this.who()){
		case 'Micah': discid = DiscordID.Micah
		case 'Venqm': discid = DiscordID.Venqm
		case 'Wqffle': discid = DiscordID.Wqffle
		case 'Onyx': discid = DiscordID.Onyx
		case 'Dani': discid = DiscordID.Dani
	} return DependencyContext.collectPromise(
		GetDisc(discid)).value
	}

	protected override collectAsyncResources(): void {
		super.collectAsyncResources()

	}
	@computed()
	private Localsrc(): string{
		switch(this.who()){
			case 'Micah': return '/Custom/Images/Bogo Eevee.svg'
			case 'Venqm': return ''
			case 'Wqffle': return '/Custom/Images/Wqffle.svg'
			case 'Onyx': return '/Custom/Images/Onyx.svg'
			case 'Dani': return ''
	}}

	@computed()
	private Nsrc(){ return this.UseCurrent() ? viaProxy(this.Cord().avatar.link.toString()) : this.Localsrc() }

	private static Micah(isCurrent: boolean = false){
		return (<Person who={'Micah'} UseCurrent={isCurrent}/>)
	}


	constructor(props?: PersonProps){
		super({src: ()=>this.Nsrc(), ...props})
		switch(this.who()){
			case "Micah": this.ImgSize(.22)
			case "Venqm":
			case "Onyx":
			case "Wqffle":
			case "Dani":
		}
	}
}

