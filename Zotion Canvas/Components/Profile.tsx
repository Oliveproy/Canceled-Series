import { Circle, CubicBezier, Img, Knot, Layout, LayoutProps, Line, NodeProps, Spline } from "@motion-canvas/2d/lib/components";
import { colorSignal, initial, signal } from '@motion-canvas/2d/lib/decorators';
import { createSignal, SignalValue, SimpleSignal } from '@motion-canvas/core/lib/signals';
import { ColorSignal, PossibleColor, PossibleVector2, Vector2 } from "@motion-canvas/core/lib/types";
import { Reference, createRef, makeRef, range, useLogger } from "@motion-canvas/core/lib/utils";
import { all, chain, every, loop, waitFor } from '@motion-canvas/core/lib/flow';
import { Thread, ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { Procords, Cord } from './Procord'

type talkingtypes = 'glow'| 'flipin'
type Discord = 'Micah' | 'Venqm' | 'Onyx' | 'Wqffle_' | 'Dani'


interface ProfileProps extends LayoutProps{
	src: SignalValue<string>
	
	PSize?: SignalValue<number>
	talking?: SignalValue<boolean>
	talkcolor?: SignalValue<PossibleColor>
	backcolor?: SignalValue<PossibleColor>
	ImgSize?: SignalValue<number>
	Linkedto?: SignalValue<Profile>
}

export class Profile extends Layout {

	@initial(255)
	@signal()
	public declare readonly PSize: SimpleSignal<number, this>

	@initial(2.5)
	@signal()
	public declare readonly ImgSize: SimpleSignal<number, this>

	@initial(false)
	@signal()
	public declare readonly talking: SimpleSignal<boolean, this>

	@initial('#242424')
	@colorSignal()
	public declare readonly backcolor: ColorSignal<this>

	@initial('#3ac81e')
	@colorSignal()
	public declare readonly talkcolor: ColorSignal<this>

	@signal()
	public declare readonly src?: SimpleSignal<string, this>

	@signal()
	public declare readonly Discord?: SimpleSignal<Cord, this>

	@signal()
	public declare readonly Linkedto: SimpleSignal<Profile, this>

	private Background = createRef<Circle>()
	public TalkBar = createRef<Spline>()
	private pfp = createRef<Img>()
	private Link? = createRef<Spline>()
	private knots?= { start: createRef<Knot>(), others:() => ([] as Knot[]), end: createRef<Knot>()	}

	constructor(props?: ProfileProps){
		super({ ...props })
		const Diameter= 105;
		//(async()=>this.src()): (props as DiscProps)?.Discord;
		const imag=this.Discord() != null
		//Procord.Micah.info.then(disc => disc.avatar.id)
		; 
		(this.add(
			<Circle 
			ref={this.Background} 
			fill={this.backcolor} 
			size={[this.PSize(), this.PSize()]}
			lineWidth={5} lineJoin={'round'} stroke={'#484848'}
			>
				<Spline
				ref={this.Link}
				strokeFirst stroke={'#FFF'} lineWidth={6}
				end={0}
				>
					<Knot ref={this.knots.start}/>
					<Knot ref={this.knots.end}/>
				</Spline>
				<Spline ref={this.TalkBar} lineWidth={7} stroke={this.talkcolor} closed
				smoothness={0} end={this.talking()==true? 1 : 0} size={new Vector2([this.PSize(), this.PSize()]).mul([.9,.9])}
				>
					<Knot position={[0, -Diameter*1.01]} startHandle={[-Diameter*1.36, 0]} endHandle={[Diameter*1.36, 0]}/>
    				<Knot position={[0, Diameter*1.01]}startHandle={[Diameter*1.36, 0]} endHandle={[-Diameter*1.36, 0]}
				    />
    			</Spline>
				<Img ref={this.pfp} src={this.src} scale={this.ImgSize} />
			</Circle>,
		))
		if(this.Linkedto != null){ this.Linkto(this.Linkedto) }
		
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

	public *Linkto(O: Reference<Profile>, Inb?:PossibleVector2[]): ThreadGenerator
	{
		const Other: Profile = O();
		//this.Link().opacity(100)
		const p = this.Link().worldToLocal()
		//pos.push(() => Other.absolutePosition().transformAsPoint(p))
		this.knots.start().position( () => this.absolutePosition().transformAsPoint(p))
		this.knots.end().position( () => Other.absolutePosition().transformAsPoint(p))

		this.Link().end(1,1)
		
		this.Linkedto(Other);
		Other.Linkedto(this);
	}
}

declare global{
	
}