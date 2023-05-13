type Sans = 'uni sans' | 'violet sans' | 'comic sans';
type Bungee = 'Bungee' |'Bungee Hairline' | 'Bungee Inline' | 'Bungee Shade' | 'Bungee Spice'

type Chalk = 'farmhouse chalkboard' | 'christmas chalk' | 'Permanent Marker' | 'Schoolbell' | ''

type Others = 'Foldit' | 'Sedgwick Ave Display' | '' | '' | '' | ''

type fonts = Sans | Bungee | Chalk | Others
declare type Clear<T extends string> = keyof Omit<Record<T,' '>,''>;
declare type Fonts = Clear<fonts>
//declare function Between(infetween: [Number: number,Offset: number] | number, to?: number): number