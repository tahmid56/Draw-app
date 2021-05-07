import React,{useRef, useState} from 'react';
import { SketchField, Tools } from 'react-sketch'
import { Button, Alert } from 'react-bootstrap'
import { saveAs } from 'file-saver'
import axios from 'axios';

const styles={
    draw: {
        margin :'0 auto'
    }
}

const Draw = () => {
    const [send, setSend] = useState(false)
    const sketch = useRef()

    const handleSubmit=()=>{
        const canvas = sketch.current.toDataURL()
        // saveAs(canvas, 'digit.jpg')
        sendData(canvas)
    }

    const handleReset = () => {
        sketch.current.clear()
        sketch.current._backgroundColor('black')
    }

    const sendData = (c)=>{
        console.log(c)

        const headers = {
            'accept':'application/json'
        }
        const fd = new FormData()
        fd.append('image',c)
        axios.post('http://127.0.0.1:8000/api/digits/', fd, {headers:headers})
        .then(
            res=>{
                console.log(res.data)
                setSend(true)
            }
        )
        .catch(err=>console.log(err))
    }

    const getImageResult = (id) =>{

    }

    return (
        <React.Fragment>
            {send && <Alert variant="info">Successfully send to classification</Alert>}
            <SketchField
                ref = {sketch}
                width = '650px'
                height= '650px'
                style={styles.draw}
                tool={Tools.Pencil}
                backgroundColor='black'
                lineColor='white'
                imageFormat='jpg'
                lineWidth={60}
            />
            <div className="mt-3">
                <Button onClick={handleSubmit} variant='primary'>Save</Button>
                <Button onClick={handleReset} variant='secondary'>Reset</Button>
            </div>
        </React.Fragment>

    );
}

export default Draw;

