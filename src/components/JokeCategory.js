export default function JokeCategory({ onCategoryChange }) {
    return <select onChange={(event) => onCategoryChange(event.target.value)}>
        <option></option>
        <option value={'animal'}>animal</option>
        <option value={'career'}>career</option>
        <option value={'celebrity'}>celebrity</option>
        <option value={'dev'}>dev</option>
        <option value={'explicit'}>explicit</option>
        <option value={'fashion'}>fashion</option>
        <option value={'food'}>food</option>
        <option value={'history'}>history</option>
        <option value={'money'}>money</option>
        <option value={'movie'}>movie</option>
        <option value={'music'}>music</option>
        <option value={'political'}>political</option>
        <option value={'religion'}>religion</option>
        <option value={'science'}>science</option>
        <option value={'sport'}>sport</option>
        <option value={'travel'}>travel</option>
    </select>
}