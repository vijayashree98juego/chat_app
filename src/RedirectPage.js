import { useNavigate } from 'react-router-dom';
 
function RedirectPage(props) {
  const navigate = useNavigate();

function goBack(){
  navigate(-1)
}
  return (
    <>
    <button style={{float:'right'}}onClick={goBack}>back</button>
    </>
  );
}

export default RedirectPage;