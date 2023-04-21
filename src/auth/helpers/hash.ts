import { hash, compare } from "bcrypt";
/**
 * Encrypt password async
 * @param {string} password 
 * @returns {Promise<string>}
 */
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


/**
 * Validate password with hash
 * @param {string} hash encrypted password
 * @param {string} password password to compare
 * @returns 
 */
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