const bcrypt = require('bcrypt');


interface CompareHash{
    compare:string
    comparedTo:string
}
export const CompareHash =({compare,comparedTo}:CompareHash)=>{
    if(bcrypt.compareSync(compare,comparedTo)){
        return true
    }
    return false
}
export const hashPassword = async (saltRounds:number, value:string)=>{
    const salt= await bcrypt.genSaltSync(saltRounds);
    const hashedPassword= await bcrypt.hash(value, salt)
    if(hashedPassword){
        return hashedPassword
    }
    return
}