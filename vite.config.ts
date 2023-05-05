/** @type {import('vite').UserConfig} */
import {defineConfig} from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import * as fs from 'fs'
import * as path from 'path'

const root = './Zotion Canvas'
const cancels = ()=>fs.readdirSync(root, {withFileTypes: true})
  .filter(v => v.isDirectory()).filter(v => v.name.includes('Canceled')) //Filters out entries that aren't folders starting with 'Canceled'
  .map(v => v.name).filter((v,i)=>v.split('-', 2)[1]==i.toString()) //Checks if it's a valied entry
  .map(sub => {return {
	S: sub,
	F: fs.readdirSync(path.join(root, sub), {withFileTypes: true}).filter(v => v.isFile()).map(v => v.name)
  }}) //Map it to an object which stores the folder's name & files
  .map(a => path.join(root, a.S,
	a.F.map(v => fs.readFileSync(path.join(root, a.S, v), {encoding: 'utf8'}).includes('export default makeProject')?v:'')
		.filter(v=> v!='').join()
	))//Gets the project file's name
  .filter((v, i)=> v.includes(`Canceled-${i}\\`)).map(v => `./${v.split('\\').join('/')}`)//Put's names into correct format

export default defineConfig({
  plugins: [ motionCanvas({ project: [`${root}/Canceled-Test/TestProject.ts`,...cancels()] }) ],
});