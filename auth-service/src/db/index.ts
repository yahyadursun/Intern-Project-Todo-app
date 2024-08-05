import { Bucket,connect,Collection,Scope } from "couchbase";

export async function getCouchbaseConnection() {
    const cluster = await connect("couchbase://127.0.0.1",{
        username:"Administrator",
        password:"123456"
    });
    const travelSampleBucket: Bucket = cluster.bucket("travel-sample");
    const inventoryScope: Scope = travelSampleBucket.defaultScope();
    const users: Collection = inventoryScope.collection("users");
    
    return{
        users,
        cluster,
    };
}