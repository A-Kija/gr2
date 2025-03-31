import useImage from '../Hooks/useImage';

export default function NewPost() {

    const { image, setImage, readFile } = useImage()

    return (
        <section className="main">
            <div className="post-form">
                <div className="post-form__top">
                    <h1>Create new POST</h1>
                </div>
                <div className="post-form__content">
                    <textarea></textarea>
                </div>
                <div className="post-form__images">
                    <div className="post-form__images__col">
                        <div className="post-form__images__col__buttons">
                            <input id="image-input" type="file" onChange={readFile} />
                            <label class="add" htmlFor="image-input">+</label>
                        </div>
                        {
                            image
                            ?
                            <div className="post-form__images__col__image">
                                <img src={image} alt="post picture" />
                            </div>
                            :
                            <div className="post-form__images__col__no-image"></div>
                        }
                    </div>
                
                </div>
            </div>
        </section>
    );
}