import './app.scss';
import './buttons.scss';
import Checkbox from './Components/045/Checkbox';
import CheckboxX4 from './Components/045/CheckboxX4';
import RadioX4 from './Components/045/RadioX4';
import Select from './Components/045/Select';
// import Task from './Components/045/Task';
import Text from './Components/045/Text';
import TextX3 from './Components/045/TextX3';


export default function App() {


    return (
        <div className="App">
            <header className="App-header">

                
                {/* <Task /> */}

                <RadioX4 />

                <CheckboxX4 />

                <Checkbox />
                
                <Select />
                <TextX3 />
                <Text />
                

            </header>
        </div>
    );
}