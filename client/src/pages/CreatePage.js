import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useNavigate } from "react-router-dom";

export const CreatePage = () => {
  const history = useNavigate()
  const auth = useContext(AuthContext)
  const {request} = useHttp()
  const [link, setLink] = useState('')

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {Authorization:`Bearer ${auth.token}`})
        console.log('Create link:', data);
        history(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field s6">
          <input placeholder="Введите ссылку" id="link" type="text" value={link} className="yellow-input" onChange={e => setLink(e.target.value)} onKeyPress={pressHandler} />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
}