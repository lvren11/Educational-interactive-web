import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
  

function TextInput(props) {
  const { textvalue, settextvalue} = props;

  const handletextChange = (event) =>{
    settextvalue(event.target.value);
  }

  return (
    <>
        <Typography variant="h5">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请简要阐述你的作答理由：
        </Typography>
        <TextField
            id="filled-full-width"
            multiline
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            variant="outlined"
            value={textvalue ? textvalue : ""}
            onChange={handletextChange}
        />
        <br />
        <br />
    </>
  );
}

export default TextInput;