import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import {all, chain, waitFor} from '@motion-canvas/core/lib/flow';
import { createRef, range } from '@motion-canvas/core/lib/utils';
import { Profile } from '../../Components/Profile';
import { Color, PossibleColor, Vector2 } from '@motion-canvas/core/lib/types';
import { Knot, Spline, Txt } from '@motion-canvas/2d/lib/components';
import { easeInCubic } from '@motion-canvas/core/lib/tweening';
import { SimpleSignal, createSignal } from '@motion-canvas/core/lib/signals';
import { Gradient } from '@motion-canvas/2d/lib/partials';
import { pos as kpos } from '../Extras/Lines'



//@ts-ignore
export default makeScene2D(function* (view) {
  const Micah = createRef<Profile>(); const lineprog = createSignal(0);
  const Oliveproy = createRef<Txt>()
  const line = createRef<Spline>()
  const nx = (a: number)=>new Vector2(-a, a)
  const colr: (clr: PossibleColor)=>Color = (clr: PossibleColor)=> new Color(clr)
  const Olivegrade: {width: SimpleSignal<number>,colors: SimpleSignal<PossibleColor>[], offsets: number[]}= 
  {
    width: createSignal(210), //@ts-ignore
    colors: range(3).map(()=>{ const t: SimpleSignal<PossibleColor> = createSignal('#21212C'); return t}),
    offsets: [0, .91, 1]
  }

  view.add(
  <>
    <Txt ref={Oliveproy} fontFamily={'Sedgwick Ave Display'} fontSize={200}
    text={'Oliveproy'} fill={new Gradient({
      from: [-Olivegrade.width()/2, 0], to: [Olivegrade.width()/2, 0], angle: 110,
      stops: Olivegrade.colors.map((v,i,a)=> {return {offset:Olivegrade.offsets[i], color: v}})
    })}
  />

    <Spline ref={line} stroke={'white'} lineWidth={5} opacity={0}>
      {kpos.map(i => (<Knot position={i}  />) )} 
    </Spline>
    <Profile ref={Micah} position={[-300, 1000]} ImgSize={(.22)} scaleX={-1} src={'/Custom/Images/Bogo Eevee.svg'}/>
  </>
  )
  view.add(
    <>
    {range([...kpos].length).map(i =>
    (<Txt fill={'white'} fontSize={25} size={0}
      text={`Knot ${i}: [${kpos[i]().x}, ${kpos[i]().y}]`}
      position={[-950, -550+(25*(i+1))]}/>)
    )}
    </>
  )

  const post = Micah().position;
  yield* Micah().position([-300, 100], 1)
  yield* Micah().Talk('glow', .3); yield* waitFor(.25)
  yield* Micah().scale([-5,5]); yield* waitFor(.25)
  yield* Micah().Talk('glow', .3)
  yield* all(
    Micah().Talk('glow', 1),
    Micah().scale([-3, 3], 1),
    chain(
      Micah().position(kpos[0](), 1),
      Micah().position(()=>line().getPointAtPercentage(lineprog()).position, 0)
    )
  )

  yield* all(
    chain(
      Micah().scale(nx(1.5), .75),
      Micah().scale(nx(1), .25)
    ),
    chain(
      yield lineprog(1, 2.125),
      Micah().position(kpos[kpos.length-1]().addX(-10), .1)
    ),
    chain(
      yield waitFor(.65),
      all(
        Olivegrade.colors[0]('cyan', .27, easeInCubic, Color.createLerp('rgb')),
        Olivegrade.colors[1]('cyan', .25, easeInCubic, Color.createLerp('rgb')),
        Olivegrade.colors[2]('cyan', .25, easeInCubic, Color.createLerp('rgb')),
      ),
      yield waitFor(1/*.2*/),
      all(
        Olivegrade.colors[1]('#C746C2', .5, easeInCubic, Color.createLerp('rgb')),
        waitFor(.05, Olivegrade.colors[2]('#DB7AD7', .5, easeInCubic, Color.createLerp('rgb')))
      ),
    ))
  yield* chain(
    Micah().position([post().x, post.y()+50], 0),
    yield waitFor(.1),
    Micah().position([post().x, -1000], .375)
  )

  yield* waitFor(1)
});