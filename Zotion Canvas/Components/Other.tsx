import { Rect, Txt } from "@motion-canvas/2d/lib/components";
import { SignalValue } from "@motion-canvas/core/lib/signals";

interface TB {
	Text: SignalValue<string>,

}


function TextBox(props: TB)
{
	return (
	<Rect layout>
		<Txt text={props.Text}/>		
	</Rect>
		)	
}