import { Cord } from "../Components/Procord"

type company = 'Youtube' | 'Twich' | 'Discord' | '' | '' | '' | ''
function logos(Comp_url: URL | company): URL{
	var _url: URL; const Comurl = !Comp_url.toString().includes('.')? 'isname' : 'isurl'
	const ifcompany = (Comp_url as company); const ifurl = (Comp_url as URL);
	if(Comurl == 'isname'){
		switch(ifcompany){
			case 'Discord': _url = new URL('discord.com'); break;
			case 'Youtube': _url = new URL('youtube.com'); break;
			case 'Twich': _url = new URL('twitch.tv'); break;
	}} else{ _url = ifurl }
	return new URL(`https://logo.clearbit.com/${_url}`)
}


async function GetDisc(id:string): Promise<Cord> {
	const inital = await fetch(`https://discordlookup.mesavirep.xyz/v1/user/${id}`)
	const Corded = inital.json().then(v => (v as Cord))
	return Corded
}

export { logos, GetDisc };