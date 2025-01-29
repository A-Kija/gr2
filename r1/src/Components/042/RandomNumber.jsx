import rand from '../../Functions/rand';

export default function RandomNumber() {

    return (
        <div>
            <h1>{rand(100, 999)}</h1>
        </div>
    );

}
