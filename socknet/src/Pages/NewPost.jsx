import { useContext, useState } from 'react';
import useImage from '../Hooks/useImage';
import Data from '../Contexts/Data';
import Auth from '../Contexts/Auth';
import * as A from '../Constants/actions';
import * as C from '../Constants/main';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';


export default function NewPost() {

    const { images, addImage, readFile, remImage, mainImage } = useImage();
    const [text, setText] = useState('');
    const { setStorePost, dispatchPosts } = useContext(Data);
    const { user } = useContext(Auth);
    const navigate = useNavigate();

    const handleText = e => {
        const value = e.target.value;
        // gal validuoti ?
        setText(value);
    }

    const submit = _ => {
        const uuid = v4();
        setStorePost({
            text,
            images,
            uuid
        });
        const image = images.find(img => img.main === true);
        dispatchPosts({
            type: A.ADD_NEW_POST,
            payload: {
                user,
                image,
                text,
                postID: uuid
            }
        });
        navigate(C.GO_AFTER_NEW_POST);
    }


    return (
        <section className="main">
            <div className="post-form">
                <div className="post-form__top">
                    <h1>Create new POST</h1>
                </div>
                <div className="post-form__content">
                    <textarea value={text} onChange={handleText}></textarea>
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

                <div className="post-form__submit">
                    <button type="submit" onClick={submit}>Post It</button>
                </div>
            </div>
        </section>
    );
}