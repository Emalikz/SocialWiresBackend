import { hash, compare } from "bcrypt";
export const hashAsync = (password)=>{
    return new Promise<string>((resolve,reject)=>{
        hash(password, 10, (error, password)=>{
            if(error){
                return reject(error);
            }
            return resolve(password);
        })
    });
}

export const compareAsync = (hash, password)=>{
    return new Promise<boolean>((resolve,reject)=>{
        compare(password, hash , (error, password)=>{
            if(error){
                return reject(error);
            }
            return resolve(password);
        })
    });
}