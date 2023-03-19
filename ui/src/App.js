import './App.css';
import {useState} from "react";
import Button from "@mui/material/Button";
import {ButtonGroup, Container} from "@mui/material";
import Typography from "@mui/material/Typography";

function MyButton({onClick, value}) {
  return (
      <Button variant="contained" onClick={onClick}>{value}</Button>
  )
}

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <Typography variant="h1">
                {count}
            </Typography>
            <Container maxWidth="sm">
                <ButtonGroup variant="contained">
                    <MyButton onClick={() => setCount(count + 1)} value="Increment"/>
                    <MyButton onClick={() => setCount(count - 1)} value="Decrement"/>
                </ButtonGroup>
            </Container>
        </div>
    );
}

export default App;
