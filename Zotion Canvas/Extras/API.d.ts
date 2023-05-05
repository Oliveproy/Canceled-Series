import { Cord } from "../Components/Procord";
type company = 'Youtube' | 'Twich' | 'Discord' | '' | '' | '' | ''

declare function GetLogo(url: URL): URL;
declare function GetLogo(Company: company): URL;

declare function GetDisc(id:string): Promise<Cord>