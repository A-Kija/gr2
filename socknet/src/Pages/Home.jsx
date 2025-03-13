import PostsList from '../Components/Posts/PostsList';
import UsersList from '../Components/Users/UsersList';

export default function Home() {

    return (
        <section className="main">
           <UsersList />
           <PostsList />
           {console.log('HOME List rendered')}
        </section>
    );
}