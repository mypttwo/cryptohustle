export function getAuthConfig(context){
    let headers = {
        "Content-Type": "application/json",
        "x-access-token": context.authToken
    };

    let params = {
        id: context.userDbId
    };
  
    return { headers, params }; 
}