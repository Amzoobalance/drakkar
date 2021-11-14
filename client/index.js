const {createReadStream } = require("fs");
const {createGzip} = require ("zlib"); 
const { request } = require ("http"); 

const [INPUT_PATH, OUTPUT_PATH, HOST, LOGIN, PASS] = process.argv.slice(2);


const unifiedCredentials = `${LOGIN}:${PASS}`
const base64Credentials = Buffer.from(unifiedCredentials).toString('base64');
const authorization = `Basic ${base64Credentials}`


const readStream =  createReadStream(INPUT_PATH);
const writeStream = request(HOST, {
    method: "POST", 
    headers: { "file-path": OUTPUT_PATH, authorization},
});
const compressStream = createGzip();


readStream
.on("end", ()=>{
    if (process.argv.includes("-v")) {
        console.log(`${INPUT_PATH} -> ${OUTPUT_PATH}`)
    }
})
.pipe(compressStream)
.pipe(writeStream)


.on('error', (e) => {
    console.error(e.message);
    process.exit(1);
});


