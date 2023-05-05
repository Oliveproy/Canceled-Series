import { makeScene2D } from "@motion-canvas/2d";
import { createRef, range, useLogger } from "@motion-canvas/core/lib/utils";
import { Profile } from "../../Components/Profile";
import { Profo } from '../../Components/Profo';
import { waitFor } from "@motion-canvas/core/lib/flow";
import { Knot, Layout, Spline, Txt } from "@motion-canvas/2d/lib/components";
import { PossibleColor, PossibleVector2, Vector2 } from "@motion-canvas/core/lib/types";
import { textLerp, tween } from "@motion-canvas/core/lib/tweening";
import { createSignal } from "@motion-canvas/core/lib/signals";

export default makeScene2D(function* (view) {

	const Micah = createRef<Profo>();
	const sign = createSignal('2')

	view.add(<Profo ref={Micah} name={'Micah'} />)

	yield* Micah().name('Micah6yopro', 1)
	//yield* Micah().media('', 1)
	yield* waitFor(1)
})