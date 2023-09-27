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
// interface는 재호출해서 상속이 가능
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
//////////

type PT = {
    a:string
}
class CT implements PT{
    constructor(
        public a:string
    ){}
}

interface PI {
    a:string
}
class CI implements PI{
    constructor(
        public a:string
    ){}
}
