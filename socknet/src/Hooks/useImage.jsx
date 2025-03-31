import { useState } from 'react';
import { v4 } from 'uuid';


export default function useImage() {

    const [images, setImage] = useState([]);

    const imageReader = img => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = _ => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const readFile = (e, id) => {
        const img = e.target.files[0];
        console.log(img);
        imageReader(img)
            .then(res => setImage(imgs => imgs.map(img => img.id === id ? {...img, src: res} : img)))
            .catch(_ => setImage(imgs => imgs.map(img => img.id === id ? {...img, src: null} : img)))
    }

    const addImage = _ => {
        setImage(imgs => [{ id: v4(), src: null, main: imgs.length === 0 ? true : false }, ...imgs]);
    }

    const remImage = id => {
        setImage(imgs => imgs.filter(img => img.id !== id));
    }

    const mainImage = id => {
        setImage(imgs => imgs.map(img => img.id === id ? {...img, main: true} : {...img, main: false}))
    }

    return { images, addImage, readFile, remImage, mainImage }

}