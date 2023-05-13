import { PossibleColor } from "@motion-canvas/core/lib/types"
import { GetDisc } from "@APIs"

interface Cord{
    id: string,
    tag: string,
    badges: string[],
    avatar: {
        id: string,
        link: URL,
        is_animated: boolean
    },
    banner: {
        id: string,
        link: URL,
        is_animated: boolean,
        color: PossibleColor
    }
}



//const UseID= async (id:string)=> (await fetch(`https://discordlookup.mesavirep.xyz/v1/user/${id}`)).json().then(v => (v as Cord))

export const Procords= {
	Micah: GetDisc('406618705473175563'),
	Venqm: GetDisc('985709422263296041'),
	Onyx: GetDisc('985704876447256636'),
	Wqffle_: GetDisc('623491066850443267'),
	Dani: GetDisc('875701999243509810'),

    UseID: GetDisc
}

export {Cord}