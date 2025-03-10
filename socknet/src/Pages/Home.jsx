import PostsList from '../Components/PostsList';
import UsersList from '../Components/Users/UsersList';

export default function Home() {

    return (
        <section className="main">
           <UsersList />
           <PostsList />
        </section>
    );
}