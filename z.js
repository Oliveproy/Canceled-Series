const fs = require('fs')
const path = require('path')

const root = './Zotion Canvas'
const cancels = fs.readdirSync(root, {withFileTypes: true})
  .filter(v => v.isDirectory()).filter(v => v.name.includes('Canceled'))
  .filter((v, i)=> v.name.split('-', 2)[1]==i.toString()).map(v => v.name)
  .map(sub => {return {
	S: sub,
	F: fs.readdirSync(path.join(root, sub), {withFileTypes: true}).filter(v => v.isFile()).map(v => v.name)
  }})
  .map(a => path.join(root, a.S,
	a.F.map(v => fs.readFileSync(path.join(root, a.S, v), {encoding: 'utf8'}).includes('export default makeProject')?v:'')
		.filter(v=> v!='').join()
	)
  )
  .filter((v, i)=> v.includes(`Canceled-${i}\\`))
//  .map(sub =>{
//    const z = (v)=> fs.readFileSync(path.join(root, sub, v), {encoding: 'utf8'})
//    const w = fs.readdirSync(sub, {withFileTypes: true}).filter(v => v.isFile()).map
//    const b = w(v=> z(v).includes('export default makeProject'))
//    const c = b.indexOf(true)
//   return path.join(root, sub, w(v => z(v))[c])
//  })

console.log(cancels)