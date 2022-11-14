import PocketBase from "pocketbase";

const URL = import.meta.env.API_URL || "http://127.0.0.1:8090";

const pb = new PocketBase(URL);
export default pb;
