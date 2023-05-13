import { makeScene2D } from "@motion-canvas/2d";
import { createRef, range, useLogger } from "@motion-canvas/core/lib/utils";
import { Profile } from "../../Components/Profile";
import { Profo } from '../../Components/Profo';
import { waitFor, all } from '@motion-canvas/core/lib/flow';
import { Knot, Layout, Spline, Txt } from "@motion-canvas/2d/lib/components";
import { PossibleColor, PossibleVector2, Vector2 } from "@motion-canvas/core/lib/types";
import { textLerp, tween } from "@motion-canvas/core/lib/tweening";
import { createSignal } from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {

	const Micah = createRef<Profo>();
	const sign = createSignal('2')

	view.add(<Profo ref={Micah} name={''} status={''}/>)

	yield* Micah().scale(.5, 1).to(1, 1)
	yield* Micah().position([-725,0], 1).to([-725,0], .1).to([725,0], 1.5).to([725,0], .1).to(0, 1)
	yield* Micah().name('Mica', 1).wait(.1).to('', .2).to('Oliveproy', .9)
	yield* Micah().status('Suffering', .87).wait(.08).to('', .1).to('Coding', .1)
	yield* Micah().about('THIS TOOK ME A MONTH OF BRAIN POWER WHY', 2)
	yield* waitFor(1)
})