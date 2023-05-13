import { makeScene2D } from "@motion-canvas/2d";
import { Person, Profile } from '../../Components/Profile'
import { createRef } from "@motion-canvas/core/lib/utils";
import { all, waitFor } from "@motion-canvas/core/lib/flow";
import { ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { Layout, Txt } from "@motion-canvas/2d/lib/components";
import { Gradient } from "@motion-canvas/2d/lib/partials";
import { PossibleColor, Vector2 } from "@motion-canvas/core/lib/types";

export default makeScene2D(function* (view){
	const Micah = createRef<Profile>()
	const Onyx = createRef<Profile>()
	const Preston = createRef<Profile>()
	const Venqmous = createRef<Profile>()
	const Dani = createRef<Profile>()
	const Usernames={Micah:createRef<Txt>(),Ven:createRef<Txt>(),Onyx:createRef<Txt>(),Wqffle:createRef<Txt>(),Dani:createRef<Txt>()}
	const Gradent = (s1: PossibleColor, s2: PossibleColor, s3: PossibleColor)=>new Gradient({to:-105, from:105, angle:110,
		stops:[{offset: 0, color:s1}, {offset: .91, color:s2}, {offset: 1, color: s3}]})
//Standard Galactic Alphabet
	view.add(<>
	<Profile ref={Micah} src={'/Custom/Images/Bogo Eevee.svg'} ImgSize={.22}  position={[-750, 0]}>
	<Txt ref={Usernames.Micah} text={'Micah'} fill={Gradent('cyan', 'C746C2', 'DB7AD7')} fontFamily={'Sedgwick Ave Display'} scale={2}/>
	</Profile>
	<Profile ref={Venqmous} src={'/Custom/Images/Venqmous.svg'} ImgSize={.45} position={[-375, 0]}>
	<Txt ref={Usernames.Ven} text={'Venqmous'} fontFamily={'christmas chalk'} fontWeight={1000}
	fill={Gradent('lime', 'green', '000000')} scale={.91}/>
	</Profile>
	<Profile ref={Onyx} src={'/Custom/Images/Onyx.svg'} ImgSize={1}           position={[0, 0]}>
		<Txt ref={Usernames.Onyx} text={'Onyx'} fontFamily={'Kalam'} scale={1.5}
		fill={Gradent('ff00ff','ff66cc', 'pink')} fontWeight={1000}/>
	</Profile>
	<Profile ref={Preston} src={'/Custom/Images/Wqffle.svg'} ImgSize={.6}     position={[375, 0]}>
	<Txt ref={Usernames.Wqffle} text={'Wqffle'} fontFamily={'Permanent Marker'} fontWeight={300}
	fill={Gradent('e68a00', '996600', '663d00')} scale={1.125}/>
	</Profile>
	<Profile ref={Dani} src={'/Custom/Images/Dani.svg'} ImgSize={.5}          position={[750, 0]}>
	<Txt ref={Usernames.Dani} text={'Dani'} fontFamily={'foldit'} fontWeight={1000} scale={1.5}/>
	</Profile>
	</>)
	//yield* Usernames.Micah().position([0, -175], 0); yield* Usernames.Ven().position([0, -175], 0)
	//yield* Usernames.Onyx().position([0, -175], 0); yield* Usernames.Wqffle().position([0, -175], 0)
	//yield* Usernames.Dani().position([0, -175], 0)
	const up = new Vector2([0, -175])
	yield* waitFor(1)
	yield* all(
		Micah().scale(1.25, 1).wait(2).to(1, 2),
		Venqmous().scale(1.25, 1.25).wait(1.75).to(1, 1.75),
		Onyx().scale(1.25, 1.5).wait(1.5).to(1, 1.5),
		Preston().scale(1.25, 1.75).wait(1.25).to(1, 1.25),
		Dani().scale(1.25, 2).wait(1).to(1, 1),

		Usernames.Micah().position(0, .5).to(up, 1).wait(1.25).to(0, .5),
		Usernames.Ven().position(0, .75).to(up, 1).wait(1).to(0, .5),
		Usernames.Onyx().position(0, 1).to(up, 1).wait(.75).to(0, .5),
		Usernames.Wqffle().position(0, 1.25).to(up, 1).wait(.5).to(0, .5),
		Usernames.Dani().position(0, 1.5).to(up, 1).wait(.25).to(0, .5)
		)
})