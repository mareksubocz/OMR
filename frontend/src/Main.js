import React, {useState} from "react";
import DropzoneAreaExample from './DropzoneAreaExample';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Loader from 'react-loader-spinner'
import SplitPane from 'react-split-pane';
import XMLLogo from './img/MusicXMLlogo.png'
import MIDILogo from './img/MIDILogo.png'
// import MXLFile from './data/result.mxl'
// import MIDIFile from './data/result.mid'
import axios from 'axios'


function Main(){
    var [image, setImage] = useState();
    var [loading, setLoading] = useState(false);
    var [ready, setReady] = useState(false);
    var [id, setId] = useState();

    function handleButton(){
        if(image === undefined || !image.length){
            alert("Please upload an image first!")
            return
        }

        //POST request to analyze the photo
        let fd = new FormData()
        fd.append('file', image[0])
        let config = {
            headers: {
                "Content-Type": "image/*",
                'Access-Control-Allow-Origin': '*',
            }
        }

        setLoading(false)
        setReady(true)
        axios.post('http://127.0.0.1:5000/predict', fd, config)
            .then((response) => {
                setId(response.data["id"])
                setLoading(false)
                setReady(true)
            })
    }

    return (
        <div className="root">
            <CssBaseline/>
            <SplitPane split="vertical" minSize="50%" className="splitpane">
                <div className="lewa">
                    <Paper className="paper" elevation={3} square={true}>
                        <DropzoneAreaExample 
                            onDelete={setImage} 
                            onDrop={setImage}
                        />
                        <div className="submit">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                onClick={() => { handleButton() }}
                            >
                                Analyze
                            </Button>
                        </div>
                    </Paper>
                </div>
                <div className="prawa">
                    <Loader 
                        style={{display: loading ? '': 'none'}}
                        type="TailSpin" 
                        color="white" 
                        width="100"
                        height="100"
                        className="loader"
                    />
                    <div className="przyciski" style={{display: ready ? 'flex': 'none'}}>
                        <Paper className="przyciskiPaper" style={{backgroundColor: "rgba(255, 255, 255, 0.9)"}} elevation={3} square={true}>
                            <a download="result.mxl" href={`http://127.0.0.1:5000/mxl/${id}`}>
                                <Button>
                                    <div className="downloadButton" >
                                        <img src={XMLLogo} alt="logo" className="logo"/>
                                        Download MusicXML
                                    </div>
                                </Button>
                            </a>
                            <a download="result.mid" href={`http://127.0.0.1:5000/mid/${id}`}>
                                <Button>
                                    <div className="downloadButton">
                                        <img src={MIDILogo} alt="logo" className="logo"/>
                                        Download MIDI
                                    </div>
                                </Button>
                            </a>
                        </Paper> 
                    </div>
                </div>
            </SplitPane>
        </div>
    );
}
 
export default Main
