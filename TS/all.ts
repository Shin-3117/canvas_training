interface MyStorage<T>{
    [key:string] : T
}

class LocalStorage<T>{
    private storage :MyStorage<T> ={}
    set(key:string, value:T){
        this.storage[key] = value;
    }
    remove(key:string){
        delete this.storage[key]
    }
    get(key:string):T{
        return this.storage[key]
    }
}

const stringStorage 
= new LocalStorage<string>()