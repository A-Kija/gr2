import './app.scss';
import './buttons.scss';
import Select from './Components/045/Select';
// import Task from './Components/045/Task';
import Text from './Components/045/Text';
import TextX3 from './Components/045/TextX3';


export default function App() {


    return (
        <div className="App">
            <header className="App-header">

                
                {/* <Task /> */}
                
                <Select />
                <TextX3 />
                <Text />
                

            </header>
        </div>
    );
}