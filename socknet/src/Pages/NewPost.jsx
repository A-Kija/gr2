import useImage from '../Hooks/useImage';


export default function NewPost() {

    const { images, addImage, readFile, remImage, mainImage } = useImage();


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

                    {

                        images.map(image =>

                            <div key={image.id} className="post-form__images__col">
                                <div className="post-form__images__col__buttons">
                                    <input id={'i-' + image.id} type="file" onChange={e => readFile(e, image.id)} />
                                    <label className="add" htmlFor={'i-' + image.id}>+</label>
                                    <label className="rem" onClick={_ => remImage(image.id)}><span>-</span></label>
                                    <label className="main" onClick={_ => mainImage(image.id)}>{image.main ? 'M' : ''}</label>
                                </div>
                                {
                                    image.src
                                        ?
                                        <div className="post-form__images__col__image">
                                            <img src={image.src} alt="post picture" />
                                        </div>
                                        :
                                        <div className="post-form__images__col__no-image"></div>
                                }
                            </div>

                        )

                    }

                </div>
                <div className="post-form__add">
                    <div className="post-form__add__button" onClick={addImage}>+</div>
                </div>
            </div>
        </section>
    );
}