//abstract 클래스에 상속만 가능, 직접 생성 x
abstract class User{
    constructor(
        // private, public JS는 없는 문법
        private firstName:string, 
        protected lastName:string,
        public nickname:string
        // protected : 상속은 됨
    ){}
    getFullName(){
        return `${this.firstName} ${this.lastName}`
    }
}
// 클래스 상속 받기
class Player extends User{
    getLastName(){
// this. 으로 private firstName 은 사용 불가능
        console.log(this.lastName)
        console.log(this.nickname)
    }
}

const p1 = new Player('nico','las','asdasdas')
// p1.firstName // err
// 보호된 정보 접근 방법 : 클래스에서 리턴 함수 만들기
let a = p1.getFullName()

