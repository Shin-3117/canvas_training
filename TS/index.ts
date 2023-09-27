// abstract class User {
//     constructor(
//         protected firstName:string,
//         protected lastName:string
//     ) {}
//     abstract sayHi(name:string):string
//     abstract fullName():string
// }

// class Player extends User{
//     fullName(): string {
//         return `${this.firstName} ${this.lastName}`
//     }
//     sayHi(name: string): string {
//         const a = this.fullName()
//         return `HI! ${a}`
//     }
// }

interface User {
    firstName:string,
    lastName:string
    sayHi(name:string):string
    fullName():string
}
//extends implements 똑같이 상속하지만, 
//implements의 경우 JS변환시 자리를 차지하지 않음
class Player implements User{
    constructor(
        public firstName:string,
        public lastName:string
    ){}
    fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
    sayHi(name: string): string {
        const a = this.fullName()
        return `HI! ${a}`
    }
}

function makeUser(user:User): User{
    return{
        firstName:'성',
        lastName:'이름',
        fullName: ()=> '성 이름',
        sayHi : (name:string)=> `hi ${name}`
    }
}

const p1 = new Player('ari','su')
console.log( p1.fullName() )
console.log( p1.sayHi('a') )


type PlayerA = {
    name:string
}
type PlayerAA = PlayerA & {
    nickName:string
}
const playerA:PlayerAA={
    name:'A',
    nickName:"super A"
}

interface PlayerB {
    name:string
}
interface PlayerB {
    nickName : string
}
const playerB:PlayerB={
    name:'A',
    nickName:"super A"
}