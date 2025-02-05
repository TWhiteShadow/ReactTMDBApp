import { useCallback, useState } from "react";

const apiUrl = 'https://api.chucknorris.io/jokes/random'

export default function Joke({ category }) {
    const [blague, setBlague] = useState();

    const recupereBlague = useCallback((nextCategory = null) => {
        const url = new URL(apiUrl);
        if (nextCategory) {
            url.searchParams.append('category', nextCategory);
        }
        fetch(url.toString())
            .then(res => res.json())
            .then(data => {
                setBlague(data.value)
            });
    }, [])

    // useEffect(() => {
    //     // recupereBlague(category)
    // }, [category]);


    return (<>
        {blague === undefined && <div>Loading...</div>}
        {blague !== undefined && <p>{blague}</p>}
        <button onClick={() => recupereBlague()}>Va chercher une autre blague</button>
    </>
    )
}