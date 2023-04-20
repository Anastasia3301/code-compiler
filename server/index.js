import express, { json } from "express";
import cors from "cors";
import Axios from "axios";
const app = express();
const PORT = 8000;
 
app.use(cors());
app.use(json());
 
app.post("/compile", (req, res) => {
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    console.log('code: ',code);
    console.log('lang: ',language);
    console.log('input: ',input);

    if (language === "python") {
        language="py"
    }
 
    let data = ({
        "code": code,
        "language": language,
        "input": input
    });
    let config = {
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    Axios(config)
        .then((response)=>{
            res.send(response.data)
            console.log(response.data)
        }).catch((error)=>{
            console.log(error);
        });
})
 
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});