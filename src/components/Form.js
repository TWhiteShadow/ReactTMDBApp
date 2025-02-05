import { useState } from "react";

export default function Form({ quandJeClick }) {
  const [value, setValue] = useState('');

  const auChangementDuTexte = (event) => {
    setValue(event.target.value)
  }

  return (<>
    <textarea value={value} onInput={auChangementDuTexte} rows={5}></textarea>
      {value === '' && <span>pas de valeur à envoyer</span>}
    <button onClick={() => quandJeClick(value)} disabled={value === ''}>Valider</button>
  </>)
}